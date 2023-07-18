import "./style.scss";
import NavBar from "../../components/navbar";
import React, { useCallback, useEffect, useState } from "react";
import SelectBg from "../../components/popups/selectBg";
import Header from "../../components/headers/Header";
import Table from "../../components/table";
import GetColumnsForActiveTab from "../../data/GetColumnsForActiveTab";
import GetTitleForActiveTab from "../../data/GetTitleForActiveTab";
import axios from "axios";
import MoonLoader from "react-spinners/MoonLoader";
import Cookies from "js-cookie";
import Search from "../../assets/svg/Search";

export default function Users() {
	//=================================================================

	const [tableData, setTableData] = useState();

	//=================================================================

	const images = [
		"https://res.cloudinary.com/dguz89aez/image/upload/v1680457717/Backgrounds/bg1_rj22dh.jpg",
		"https://res.cloudinary.com/dguz89aez/image/upload/v1680457738/Backgrounds/html_table_esm8d8.jpg",
		"https://res.cloudinary.com/dguz89aez/image/upload/v1680457769/Backgrounds/bg2_vanczv.jpg",
		"https://res.cloudinary.com/dguz89aez/image/upload/v1680459126/Backgrounds/bg3_l6qlwt.jpg",
	];
	const [selectedImage, setSelectedImage] = useState(localStorage.getItem("selectedImage"));

	const updateBackground = () => {
		const personnelElement = document.querySelector(".main-container");
		personnelElement.style.background = `url(${selectedImage})  center / cover`;
		localStorage.setItem("selectedImage", selectedImage);
	};

	useEffect(() => {
		updateBackground();
		const body = document.querySelector("body"),
			sidebar = body.querySelector("nav"),
			miniHeaders = body.querySelectorAll(".miniHeader"),
			toggle = body.querySelector(".toggle");

		const handleToggleClick = () => {
			sidebar.classList.toggle("close");
			miniHeaders.forEach((miniHeader) => {
				miniHeader.classList.toggle("close");
			});
		};

		toggle.addEventListener("click", handleToggleClick);

		return () => {
			toggle.removeEventListener("click", handleToggleClick);
		};
	});

	const [bgVisible, setBgVisible] = useState(false);
	const [addVisible, setAddVisible] = useState(false);

	//============================ tables =============================
	const [activeTab, setActiveTab] = useState("personnel");
	const columns = GetColumnsForActiveTab(activeTab);

	const title = GetTitleForActiveTab(activeTab);
	const [loading, setLoading] = useState(false);
	const [refetch, setRefetch] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			const user = Cookies.get("user");
			const userRole = JSON.parse(user).role;
			if (userRole === "ADMIN") {
				setIsAdmin(true);
			} else {
				setIsAdmin(false);
			}
			const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/${activeTab}s`);

			setTableData(data.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	}, [activeTab]);

	useEffect(() => {
		fetchData();
	}, [refetch]);

	return (
		<div className="main-container">
			<Header
				setLoading={setLoading}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				setRefetch={setRefetch}
				refetch={refetch}
				isAdmin={isAdmin}
			/>
			<div className="container-nav-table">
				<NavBar
					setVisible={setBgVisible}
					setActiveTab={setActiveTab}
					setRefetch={setRefetch}
					refetch={refetch}
					activeTab={activeTab}
					isAdmin={isAdmin}
				/>
				<Table
					title={title}
					columns={columns}
					data={tableData}
					setLoading={setLoading}
					activeTab={activeTab}
					setRefetch={setRefetch}
					refetch={refetch}
					addVisible={addVisible}
				/>
			</div>

			{bgVisible && (
				<SelectBg
					setVisible={setBgVisible}
					setSelectedImage={setSelectedImage}
					images={images}
					selectedImage={selectedImage}
				/>
			)}

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
