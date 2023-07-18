import React, { useEffect, useState } from "react";
import Footer from "../../components/footers/footer";
import LoginForm from "../../components/forms/loginForm";
import ParallaxEffect from "../../utils/ParallaxEffect";
import EmailForm from "../../components/forms/EmailForgottenPassword";

const loginInfos = {
	email: "",
};

export default function SendEmailForgottenPassword() {
	const [language, setLanguage] = useState("FR"); // default language is AR
	const [login, setLogin] = useState(loginInfos);
	return (
		<div className="connect">
			<div className="login-wrapper">
				<EmailForm language={language} setLogin={setLogin} login={login} />
			</div>
		</div>
	);
}
