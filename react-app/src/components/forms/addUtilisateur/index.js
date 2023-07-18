import { useEffect, useState } from "react";
import "./../addStyle.scss";
import SimpleInput from "../../inputs/simpleInput";
import SimpleOptionInput from "../../inputs/simpleOptionInput";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AddUtilisateur({
	visible,
	activeTab,
	setLoading,
	refetch,
	setRefetch,
	additionalDataFournisseurs,
}) {
	const fields = {
		username: "",
		password: "admin",
		role: "",
	};

	//=============================================================

	//=============================================================

	//=============================================================

	//=============================================================

	const roles = [
		{ key: "admin", value: "ADMIN" },
		{ key: "user", value: "USER" },
	];

	const [formInfos, setFormInfos] = useState(fields);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormInfos({ ...formInfos, [name]: value });
	};

	const doAdd = async () => {
		try {
			setLoading(true);
			await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/${activeTab}s`, formInfos);
			setLoading(false);
			visible(false);
			setRefetch(!refetch);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	return (
		<div className="blur">
			<div className="container">
				<i className="fa-solid fa-xmark" onClick={() => visible(false)}></i>
				<header>Ajouter un utilisateur</header>

				<form action="#">
					<div className="form first">
						<div className="details personal">
							<span className="title">Détails de l'utilisateur</span>

							<div className="fields1">
								<SimpleInput
									placeholder="Nom d'utilisateur"
									type="text"
									name="username"
									handleChange={handleChange}
								/>
								<SimpleOptionInput
									placeholder="Son Role"
									options={roles}
									name="role"
									handleChange={handleChange}
								/>
							</div>
						</div>

						<Link className="backBtn submit" onClick={doAdd}>
							<span className="btnText">Enregistrer</span>
							<i className="uil uil-navigator"></i>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
