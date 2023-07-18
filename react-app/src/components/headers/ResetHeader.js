import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

export default function ResetHeader() {
	return (
		<div className="reset-header">
			<img src="images/logo.png" alt="" />
			<Link to="/" className="right-reset">
				<img src="images/icons/pf.jpg" alt="" />
				<button className="btn">Se déconnecter</button>
			</Link>
		</div>
	);
}
