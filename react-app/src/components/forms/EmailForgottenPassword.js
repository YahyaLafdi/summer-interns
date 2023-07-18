import "./style.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginInput } from "../inputs/loginInput";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import MoonLoader from "react-spinners/MoonLoader";

import { ConnectData, AudioFiles, ValidationData, Placeholders } from "../../data/ConnectPageData";

function getAudioFile(component, language) {
	return AudioFiles[component][language];
}

export default function EmailForm({ setVisible, language, setLogin, login }) {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const [playingUsername, setPlayingUsername] = useState(false);
	const [playingPassword, setPlayingPassword] = useState(false);
	const [playingForget, setPlayingForget] = useState(false);

	const { email } = login;
	const handleLoginChange = (e) => {
		const { name, value } = e.target;
		setLogin({ ...login, [name]: value });
	};

	const loginValidation = Yup.object({
		email: Yup.string()
			.required("L'adresse email est obligatoire.")
			.email("Cette adresse email est invalide.")
			.max(150, "C'est pas possible !!!!"),
	});

	// Handle the submit
	const navigate = useNavigate();
	const handleSubmit = async () => {
		try {
			setLoading(true);
			const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
				email,
			});
			setTimeout(() => {
				dispatch({ type: "LOGIN", payload: data.data });
				Cookies.set("user", JSON.stringify(data.data));
				if (!data.data.passwordChanged) {
					navigate("/reset");
				} else {
					navigate("/");
				}
			}, 2000);
			setError("");
			setSuccess(data.message);
		} catch (error) {
			setLoading(false);
			setSuccess("");
			setError(error.response.data.message);
		}
	};

	const handleClickAudio = (component, key, playing) => () => {
		const audioFile = getAudioFile(component, language);
		const audio = new Audio(audioFile);

		if (playing) {
			audio.pause();
		} else {
			audio.play();
		}
		switch (key) {
			case 0:
				setPlayingUsername(!playing);
				audio.addEventListener("ended", () => setPlayingUsername(false));
				break;
			case 1:
				setPlayingPassword(!playing);
				audio.addEventListener("ended", () => setPlayingPassword(false));
				break;
			case 2:
				setPlayingForget(!playing);
				audio.addEventListener("ended", () => setPlayingForget(false));
				break;
			default:
				break;
		}
	};

	return (
		<div className="reset-wrap">
			<div className="login-2">
				<div className="login-2-wrap">
					<h3>Trouvez votre compte</h3>
					<div className="sign-splitter"></div>
					<div>Veuillez entrer votre adresse e-mail pour rechercher votre compte.</div>
					<Formik
						enableReinitialize
						initialValues={{ email }}
						validationSchema={loginValidation}
						onSubmit={() => {
							handleSubmit();
						}}
					>
						{(formik) => (
							<Form>
								{error && <div className="error-text">{error}</div>}
								{success && <div className="success-text">{success}</div>}

								<LoginInput
									formik={formik}
									type="text"
									name="email"
									placeholder="Adresse Email"
									onChange={handleLoginChange}
									handleClickAudio={handleClickAudio("username", 0, playingUsername)}
									playing={playingUsername}
								/>
								<div className="sign-splitter"></div>
								<button type="submit" className="btn">
									Rechercher
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
