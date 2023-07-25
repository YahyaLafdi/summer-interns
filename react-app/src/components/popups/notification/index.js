import React, { useEffect, useState, useRef } from "react";
import "./style.scss";
import axios from "axios";

export default function Notifications() {
	const [notifications, setNotifications] = useState([]);
	const [showNotifications, setShowNotifications] = useState(false);
	const notificationsRef = useRef();
	const iconRef = useRef();

	const fetchNotifications = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/notifications}`);
			const notifications = response.data;
			setNotifications(notifications);
		} catch (error) {
			// Handle error
			console.error(error);
		}
	};

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (
				notificationsRef.current &&
				!notificationsRef.current.contains(event.target) &&
				(!iconRef.current || !iconRef.current.contains(event.target))
			) {
				setShowNotifications(false);
			}
		};

		const intervalId = setInterval(() => {
			fetchNotifications();
		}, 60000); // 60000 milliseconds = 5 seconds

		document.addEventListener("mousedown", handleOutsideClick);

		return () => {
			clearInterval(intervalId);
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	const handleIconClick = (event) => {
		setShowNotifications(!showNotifications);
		if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
			setShowNotifications(false);
		}
	};

	return (
		<div className="notification">
			<span className="notifications" ref={iconRef} onClick={handleIconClick}>
				<img className="uil" src="./images/icons/alarm.png" alt="" />
				{notifications.length !== 0 && <div className="pulse"></div>}
				{notifications.length !== 0 && <small className="notification-count">{notifications.length}</small>}
			</span>
			{showNotifications && (
				<div ref={notificationsRef} className="notifications-popup">
					{notifications.length !== 0 ? (
						notifications.map((notification, index) => (
							<div key={index}>
								<div className="profile-picture">
									<img src="./images/icons/warehouse.png" alt="" />
								</div>
								<div className="notification-body">
									<span dangerouslySetInnerHTML={{ __html: notification }}></span>
									<small className="text-muted">Il y a 1 minutes</small>
								</div>
							</div>
						))
					) : (
						<div>
							<div className="profile-picture">
								<img src="./images/icons/accepted.png" alt="" />
							</div>
							<span>Vous n'avez aucune notification !</span>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
