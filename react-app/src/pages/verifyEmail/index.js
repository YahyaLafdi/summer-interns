import React, { useEffect } from "react";
import ParallaxEffect from "../../utils/ParallaxEffect";
import "./../connect/style.scss";
import "./../../components/forms/style.scss";

export function VerifyEmail() {
	useEffect(() => {
		ParallaxEffect(1200, 1200);
	}, []);
	//const [visible, setVisible] = useState(false);

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
			<div className="reset-wrap">
				<div className="login-wrapper">
					<div className="login-2-wrap">PLEASE VERIFY YOUR EMAIL</div>
				</div>
			</div>
		</div>
	);
}
