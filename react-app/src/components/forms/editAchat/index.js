import React, { useState } from "react";
import "./../addStyle.scss";
import SimpleInput from "../../inputs/simpleInput";
import SimpleOptionInput from "../../inputs/simpleOptionInput";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EditAchat({
	visible,
	activeTab,
	setLoading,
	refetch,
	setRefetch,
	item,
	additionalDataFournisseurs,
	additionalDataMatieres,
}) {
	const fields = {
		nomFournisseur: item.nomFournisseur,
		idMatiere: item.idMatiere,
		prixUnitaire: item.prixUnitaire,
		quantite: item.quantite,
		dateCommande: item.dateCommande,
		tva: item.tva,
		status: item.status,
	};

	//=============================================================

	//=============================================================

	//=============================================================

	//=============================================================

	const [formInfos, setFormInfos] = useState(fields);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormInfos({ ...formInfos, [name]: value });
	};
	const handleCheckChange = (e) => {
		const { name, checked } = e.target;
		setFormInfos({ ...formInfos, [name]: checked });
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

	const getAllFournisseurs = additionalDataFournisseurs.data.data;
	const fournisseurs = getAllFournisseurs.map((fournisseur) => {
		return { key: fournisseur.nom, value: fournisseur.nom };
	});
	const getAllMatieres = additionalDataMatieres.data.data;
	const matieres = getAllMatieres.map((mat) => {
		return { key: mat.id, value: mat.intitule };
	});

	console.log(item.status);
	return (
		<div className="blur">
			<div className="container">
				<i className="fa-solid fa-xmark" onClick={() => visible(false)}></i>
				<header>Modifier une achat</header>

				<form action="#">
					<div className="form first">
						<div className="details personal">
							<span className="title">Détails de l'achat</span>

							<div className="fields">
								<SimpleOptionInput
									placeholder="Fournisseur"
									options={fournisseurs}
									name="nomFournisseur"
									handleChange={handleChange}
									itemValue={item.nomFournisseur}
								/>
								<SimpleOptionInput
									placeholder="Matiere ou fourniture"
									options={matieres}
									name="idMatiere"
									handleChange={handleChange}
									itemValue={item.idMatiere}
								/>
								<SimpleInput
									placeholder="Prix unitaire"
									type="number"
									name="prixUnitaire"
									handleChange={handleChange}
									itemValue={item.prixUnitaire}
								/>
								<SimpleInput
									placeholder="Quantité"
									type="number"
									name="quantite"
									handleChange={handleChange}
									itemValue={item.quantite}
								/>
								<SimpleInput
									placeholder="TVA"
									type="number"
									name="tva"
									handleChange={handleChange}
									itemValue={item.tva}
								/>
								<SimpleInput
									placeholder="Date de la commande"
									type="date"
									name="dateCommande"
									handleChange={handleChange}
									itemValue={item.dateCommande}
								/>
								<label className="check-container">
									Déja traité ?
									<input
										type="checkbox"
										name="status"
										checked={formInfos.status}
										onChange={handleCheckChange}
									/>
									<span className="checkmark"></span>
								</label>
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
