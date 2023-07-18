import React, { useEffect, useState } from "react";
import Footer from "../../components/footers/footer";
import LoginForm from "../../components/forms/loginForm";
import ParallaxEffect from "../../utils/ParallaxEffect";
import "./style.scss";

const loginInfos = {
	username: "",
	password: "",
};

export function Connect() {
	useEffect(() => {
		ParallaxEffect(1200, 1200);
	}, []);
	//const [visible, setVisible] = useState(false);

	const [language, setLanguage] = useState("FR"); // default language is AR
	const [login, setLogin] = useState(loginInfos);
	return (
		<div className="connect">
			<div className="bg">
				<img src="./images/homeBG/1.png" className="object" data-value="-2" alt="" />
				<img src="./images/homeBG/2.png" className="object" data-value="6" alt="" />
				<img src="./images/homeBG/4.png" className="object" data-value="-6" alt="" />
				<img src="./images/homeBG/5.png" className="object" data-value="8" alt="" />
				<img src="./images/homeBG/7.png" className="object" data-value="5" alt="" />
				<img src="./images/homeBG/8.png" className="object" data-value="-9" alt="" />
			</div>
			<div className="login-wrapper">
				<LoginForm language={language} setLogin={setLogin} login={login} />
				<Footer setLanguage={setLanguage} />
			</div>
		</div>
	);
}
