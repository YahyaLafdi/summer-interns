import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { useState } from "react";
import AddCooperative from "../forms/AddCooperative";
import { bool } from "yup";
import CoopInfos from "../popups/coopInfos";
import axios from "axios";
import { useEffect } from "react";
import Notifications from "../popups/notification";

export default function Header({
	notifications,
	isAdmin,
	setLoading,
	activeTab,
	setActiveTab,
	setRefetch,
	refetch,
}) {
	const [showAdd, setShowAdd] = useState(false);
	const [showInfos, setShowInfos] = useState(false);
	const [coopData, setCoopData] = useState(null);
	const [userCookie, setUserCookie] = useState(null);

	const handleTabClick = async () => {
		setLoading(true);
		const exists = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cooperatives`);
		if (exists.data.data === null) {
			setShowAdd(true);
		} else {
			setCoopData(exists);
			setShowInfos(true);
		}
		setLoading(false);
	};
	useEffect(() => {
		// Retrieve the cookie value and parse it as a JSON object
		const getCookieValue = (name) => {
			const value = "; " + document.cookie;
			const parts = value.split("; " + name + "=");
			if (parts.length === 2) return parts.pop().split(";").shift();
		};
		const userCookieValue = getCookieValue("username");
		setUserCookie(userCookieValue);
	}, []);
	return (
		<div className="header">
			<img src="images/logo.png" alt="" />
			<Notifications />

			<div to="/" className="right-reset">
				<Link
					className="btn-coop btn"
					onClick={() => {
						handleTabClick();
					}}
				>
					Informations de la Coopérative <img src="images/icons/coop.png" alt="" />
				</Link>
				<img src="images/icons/pf.jpg" alt="" />
				<p>{userCookie}</p>
			</div>

			{showAdd && (
				<AddCooperative
					visible={setShowAdd}
					activeTab={activeTab}
					setRefetch={setRefetch}
					refetch={refetch}
					setLoading={setLoading}
				/>
			)}
			{showInfos && (
				<CoopInfos
					visible={setShowInfos}
					data={coopData}
					setRefetch={setRefetch}
					refetch={refetch}
					setLoading={setLoading}
					isAdmin={isAdmin}
				/>
			)}
		</div>
	);
}
