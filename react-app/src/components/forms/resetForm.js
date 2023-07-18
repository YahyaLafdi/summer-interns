import "./style.scss";
import { Formik, Form } from "formik";
import Cookies from "js-cookie";
import axios from "axios";

import * as Yup from "yup";
import { useRef, useState } from "react";

import { LoginInput } from "../inputs/loginInput";

import passwordAudioAR from "../../assets/audios/passwordAR.mp3";
import emailAudio from "../../assets/audios/email.mp3";
import confPasswordAudio from "../../assets/audios/confPassword.mp3";

import ConfirmInput from "../inputs/confirmInput";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import MoonLoader from "react-spinners/MoonLoader";

const loginInfos = {
	email: "",
	newP: "",
	confP: "",
};

export default function ResetForm({ setVisible }) {
	const [loading, setLoading] = useState(false);
	const [login, setLogin] = useState(loginInfos);
	const [playingPassword, setPlayingPassword] = useState(false);
	const [playingConfPassword, setPlayingConfPassword] = useState(false);
	const [playingEmail, setPlayingEmail] = useState(false);
	const [isError, setIsError] = useState("");
	const [show, setShow] = useState(false);
	const audioRef = useRef(null);

	const { email, newP, confP } = login;
	const handleLoginChange = (e) => {
		const { name, value } = e.target;
		setLogin({ ...login, [name]: value });
	};
	const loginValidation = Yup.object({
		email: Yup.string()
			.required("L'adresse email est obligatoire.")
			.email("Cette adresse email est invalide.")
			.max(150, "C'est pas possible !!!!"),
		newP: Yup.string()
			.required("Entrez une combinaison d'au moins six chiffres, lettres et caractères spéciaux.")
			.min(6, "Le mot de passe doit contenir au moins 6 caractères.")
			.max(36, "Le mot de passe ne peut pas comporter plus de 36 caractères"),
		confP: Yup.string().required("Confirmer votre mot de passe."),
	});

	const handleClickAudio = (audioFile, key, playing) => () => {
		const audio = new Audio(audioFile);

		if (playing) {
			audio.pause();
		} else {
			audio.play();
		}
		switch (key) {
			case 0:
				setPlayingConfPassword(!playing);
				audio.addEventListener("ended", () => setPlayingConfPassword(false));
				break;
			case 1:
				setPlayingPassword(!playing);
				audio.addEventListener("ended", () => setPlayingPassword(false));
				break;
			case 2:
				setPlayingEmail(!playing);
				audio.addEventListener("ended", () => setPlayingEmail(false));
				break;
			default:
				break;
		}
	};

	const checkValidation = (e) => {
		const confPass = e.target.value;
		if (confPass === "") {
			setIsError("NOT MATCH");
			setShow(true);
		}
		if (login.newP !== confPass) {
			setIsError("Le mot de passe et le mot de passe de confirmation doivent correspondre.");
			setShow(true);
		} else {
			setIsError("");
			setShow(false);
		}
	};

	const handleConfirmation = (e) => {
		checkValidation(e);
		handleLoginChange(e);
	};
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = async () => {
		try {
			setLoading(true);
			const user = Cookies.get("user");
			const usertoken = JSON.parse(user).token;
			const newJsonObject = { passwordChanged: true, token: usertoken };
			//setLoading(true);
			await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/change-password`, {
				email: email,
				newPassword: newP,
				token: usertoken,
			});
			setTimeout(() => {
				dispatch({ type: "UPDATE_PASSWORD", payload: true });
				Cookies.set("user", JSON.stringify(newJsonObject));
			}, 2000);
		} catch (error) {
			setLoading(false);
			console.error("Error changing password:", error);
		}
	};
	return (
		<div className="reset-wrap">
			<div className="login-2">
				<div className="login-2-wrap">
					<Formik
						enableReinitialize
						initialValues={{ email, newP, confP }}
						validationSchema={loginValidation}
						onSubmit={() => {
							handleSubmit();
						}}
					>
						{(formik) => (
							<Form>
								<LoginInput
									type="text"
									name="email"
									placeholder="Addresse email"
									onChange={handleLoginChange}
									handleClickAudio={handleClickAudio(emailAudio, 2, playingEmail)}
									playing={playingEmail}
									audioRef={audioRef}
									isDefault
								/>
								<LoginInput
									type="password"
									name="newP"
									placeholder="Nouveau mot de passe"
									onChange={handleLoginChange}
									handleClickAudio={handleClickAudio(passwordAudioAR, 1, playingPassword)}
									playing={playingPassword}
									audioRef={audioRef}
									isDefault
									bottomN
								/>
								<ConfirmInput
									type="password"
									name="confP"
									placeholder="Confirmer le nouveau mot de passe"
									error={isError}
									show={show}
									onChange={(e) => handleConfirmation(e)}
									handleClickAudio={handleClickAudio(confPasswordAudio, 0, playingConfPassword)}
									playing={playingConfPassword}
									audioRef={audioRef}
									isDefault
									bottomN
								/>
								<button type="submit" className="btn">
									Réinitialiser
								</button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
			{loading && (
				<div className="blur">
					<div className="loader">
						<MoonLoader color="#8371fd" loading={loading} size={40} />
					</div>
				</div>
			)}
		</div>
	);
}
