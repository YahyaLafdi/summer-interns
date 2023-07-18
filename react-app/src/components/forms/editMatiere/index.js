import React, { useEffect, useState } from "react";
import "./../addStyle.scss";
import SimpleInput from "../../inputs/simpleInput";
import SimpleOptionInput from "../../inputs/simpleOptionInput";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EditMatiere({
	visible,
	activeTab,
	setLoading,
	refetch,
	setRefetch,
	item,
	additionalDataFournisseurs,
}) {
	const fields = {
		intitule: item.intitule,
		famille: item.famille,
		region: item.region,
		quantite: item.quantite,
		seuil: item.seuil,
		nomFournisseur: item.nomFournisseur,
	};

	//=============================================================

	//=============================================================

	//=============================================================

	//=============================================================

	const getAllFournisseurs = additionalDataFournisseurs.data.data;
	const fournisseurs = getAllFournisseurs.map((fournisseur) => {
		return { key: fournisseur.nom, value: fournisseur.nom };
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
				<header>Modifier une matiere/fourniture</header>

				<form action="#">
					<div className="form first">
						<div className="details personal">
							<span className="title">Détails du matiere/fourniture</span>

							<div className="fields">
								<SimpleInput
									placeholder="Intitulé"
									type="text"
									name="intitule"
									handleChange={handleChange}
									itemValue={item.intitule}
								/>
								<SimpleInput
									placeholder="Famille"
									type="text"
									name="famille"
									handleChange={handleChange}
									itemValue={item.famille}
								/>
								<SimpleInput
									placeholder="Region source"
									type="text"
									name="region"
									handleChange={handleChange}
									itemValue={item.region}
								/>
								<SimpleInput
									placeholder="Quantité"
									type="number"
									name="quantite"
									handleChange={handleChange}
									itemValue={item.quantite}
								/>
								<SimpleOptionInput
									placeholder="Fournisseur"
									options={fournisseurs}
									name="nomFournisseur"
									handleChange={handleChange}
									itemValue={item.nomFournisseur}
								/>
								<SimpleInput
									placeholder="Seuil minimum"
									type="number"
									name="seuil"
									handleChange={handleChange}
									itemValue={item.seuil}
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
