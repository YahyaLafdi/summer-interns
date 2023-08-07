import "./style.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginInput } from "../inputs/loginInput";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import MoonLoader from "react-spinners/MoonLoader";

import { ConnectData, AudioFiles, ValidationData, Placeholders } from "../../data/ConnectPageData";

function getAudioFile(component, language) {
	return AudioFiles[component][language];
}

export default function LoginForm({ setVisible, language, setLogin, login }) {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const [playingUsername, setPlayingUsername] = useState(false);
	const [playingPassword, setPlayingPassword] = useState(false);
	const [playingForget, setPlayingForget] = useState(false);

	const { username, password } = login;
	const handleLoginChange = (e) => {
		const { name, value } = e.target;
		setLogin({ ...login, [name]: value });
	};

	const loginValidation = Yup.object({
		username: Yup.string()
			.required(ValidationData[language].usernameRequired)
			.max(100, "C'est pas possible !!!!"),
		password: Yup.string().required(ValidationData[language].passwordRequired),
	});

	// Handle the submit
	const navigate = useNavigate();
	const handleSubmit = async () => {
		try {
			setLoading(true);
			const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
				username,
				password,
			});
			setTimeout(() => {
				dispatch({ type: "LOGIN", payload: data.data });
				Cookies.set("user", JSON.stringify(data.data));
				Cookies.set("userId", data.data.userId);
				Cookies.set("username", data.data.username);

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
		<div className="login-wrap">
			<div className="login-1">
				<img src="images/logo.png" alt="" />
				<span>
					{ConnectData[language].description.reduce((acc, text, index) => {
						if (index % 2 === 0) {
							acc.push(text);
						} else {
							acc.push(<span key={index}>{text}</span>);
						}
						return acc;
					}, [])}
				</span>
			</div>
			<div className="login-2">
				<div className="login-2-wrap">
					<Formik
						enableReinitialize
						initialValues={{ username, password }}
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
									name="username"
									placeholder={Placeholders[language].username}
									onChange={handleLoginChange}
									handleClickAudio={handleClickAudio("username", 0, playingUsername)}
									playing={playingUsername}
								/>
								<LoginInput
									formik={formik}
									type="password"
									name="password"
									placeholder={Placeholders[language].password}
									onChange={handleLoginChange}
									handleClickAudio={handleClickAudio("password", 1, playingPassword)}
									playing={playingPassword}
									bottom
								/>
								<button type="submit" className="btn">
									{ConnectData[language].connecter}
								</button>
							</Form>
						)}
					</Formik>
					<div className="sign-splitter"></div>

					<h6>
						{ConnectData[language].forgetPassword[0]}
						<Link to="" className="toggle" onClick={() => setVisible(true)}>
							{" "}
							{ConnectData[language].forgetPassword[1]}
						</Link>
						<button
							className="aud-btn"
							onClick={handleClickAudio("forgotPassword", 2, playingForget)}
							disabled={playingForget}
						>
							<i className="fa-solid fa-circle-play"></i>
						</button>
					</h6>
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
