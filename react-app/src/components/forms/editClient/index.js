import React, { useEffect, useState } from "react";
import "./../addStyle.scss";
import SimpleInput from "../../inputs/simpleInput";
import SimpleOptionInput from "../../inputs/simpleOptionInput";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EditClient({ visible, activeTab, setLoading, refetch, setRefetch, item }) {
	const fields = {
		nom: item.nom,
		pays: item.pays,
		adresse: item.adresse,
		ville: item.ville,
		nomContact: item.nomContact,
		teleContact: item.teleContact,
		cin: item.cin,
		rc: item.rc,
		tp: item.tp,
		if_valid: item.if_valid,
		ice: item.ice,
		telephone: item.telephone,
		fax: item.fax,
		email: item.email,
		siteWeb: item.siteWeb,
	};

	//=============================================================

	//=============================================================

	//=============================================================

	//=============================================================

	useEffect(() => {
		const form = document.querySelector("form"),
			nextBtn = form.querySelector(".nextBtn"),
			backBtn = form.querySelector(".backBtn");
		nextBtn.addEventListener("click", () => {
			form.classList.add("secActive");
		});

		backBtn.addEventListener("click", () => form.classList.remove("secActive"));
	});

	const category = [
		{ key: "Particulier", value: "Particulier" },
		{ key: "Société", value: "Société" },
		{ key: "Autres", value: "Autres" },
	];

	const [formInfos, setFormInfos] = useState(fields);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormInfos({ ...formInfos, [name]: value });
	};

	const doAdd = async () => {
		try {
			setLoading(true);

			await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/${activeTab}s/${item.id}`, formInfos);
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
				<header>Modifier un client</header>

				<form action="#">
					<div className="form first">
						<div className="details personal">
							<span className="title">Détails de client</span>

							<div className="fields">
								<SimpleInput
									placeholder="Nom"
									type="text"
									name="nom"
									handleChange={handleChange}
									itemValue={item.nom}
								/>
								<SimpleInput
									placeholder="Pays"
									type="text"
									name="pays"
									handleChange={handleChange}
									itemValue={item.pays}
								/>
								<SimpleInput
									placeholder="Adresse"
									type="text"
									name="adresse"
									handleChange={handleChange}
									itemValue={item.adresse}
								/>
								<SimpleInput
									placeholder="Ville"
									type="text"
									name="ville"
									handleChange={handleChange}
									itemValue={item.ville}
								/>
								<SimpleInput
									placeholder="Nom du contact"
									type="text"
									name="nomContact"
									handleChange={handleChange}
									itemValue={item.nomContact}
								/>
								<SimpleInput
									placeholder="Téléphone du contact"
									type="text"
									name="teleContact"
									handleChange={handleChange}
									itemValue={item.teleContact}
								/>
								<SimpleInput
									placeholder="CIN"
									type="text"
									name="cin"
									handleChange={handleChange}
									itemValue={item.cin}
								/>
								<SimpleInput
									placeholder="RC"
									type="text"
									name="rc"
									handleChange={handleChange}
									itemValue={item.rc}
								/>
							</div>
						</div>

						<button className="nextBtn" type="button">
							<span className="btnText">Suivant</span>
							<i className="uil uil-navigator"></i>
						</button>
					</div>

					<div className="form second">
						<div className="details address">
							<span className="title">Details de client</span>

							<div className="fields">
								<SimpleInput
									placeholder="TP"
									type="text"
									name="tp"
									handleChange={handleChange}
									itemValue={item.tp}
								/>
								<SimpleInput
									placeholder="IF"
									type="text"
									name="if_valid"
									handleChange={handleChange}
									itemValue={item.if_valid}
								/>
								<SimpleInput
									placeholder="ICE"
									type="text"
									name="ice"
									handleChange={handleChange}
									itemValue={item.ice}
								/>
								<SimpleInput
									placeholder="Téléphone"
									type="text"
									name="telephone"
									handleChange={handleChange}
									itemValue={item.telephone}
								/>
								<SimpleInput
									placeholder="FAX"
									type="text"
									name="fax"
									handleChange={handleChange}
									itemValue={item.fax}
								/>
								<SimpleInput
									placeholder="Email"
									type="text"
									name="email"
									handleChange={handleChange}
									itemValue={item.email}
								/>
								<SimpleInput
									placeholder="Site Web"
									type="text"
									name="siteWeb"
									handleChange={handleChange}
									itemValue={item.siteWeb}
								/>
							</div>
						</div>

						<div className="buttons">
							<div className="backBtn">
								<i className="uil uil-navigator"></i>
								<span className="btnText">précédent</span>
							</div>

							<Link className="backBtn submit" onClick={doAdd}>
								<span className="btnText">Enregistrer</span>
								<i className="uil uil-navigator"></i>
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
