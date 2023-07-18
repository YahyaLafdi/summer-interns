import React, { useEffect, useState } from "react";
import "./../addStyle.scss";
import SimpleInput from "../../inputs/simpleInput";
import SimpleOptionInput from "../../inputs/simpleOptionInput";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EditProduit({ visible, activeTab, setLoading, refetch, setRefetch, item }) {
	const fields = {
		intitule: item.intitule,
		uniteMesure: item.uniteMesure,
		prixUnitaire: item.prixUnitaire,
		quantiteStock: item.quantiteStock,
		seuil: item.seuil,
		lieuStockage: item.lieuStockage,
	};

	//=============================================================

	//=============================================================

	//=============================================================

	//=============================================================

	const unite_de_mesure = [
		{ key: "Pièce", value: "Pièce" },
		{ key: "Boîte", value: "Boîte" },
		{ key: "Carton", value: "Carton" },
		{ key: "Palette", value: "Palette" },
		{ key: "Mètre linéaire", value: "Mètre linéaire" },
		{ key: "Kilogramme", value: "Kilogramme" },
		{ key: "Litre", value: "Litre" },
		{ key: "Boîte de 24", value: "Boîte de 24" },
		{ key: "Paquet", value: "Paquet" },
		{ key: "Rouleau", value: "Rouleau" },
		{ key: "Set", value: "Set" },
		{ key: "Par", value: "Par" },
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
				<header>Modifier un produit</header>

				<form action="#">
					<div className="form first">
						<div className="details personal">
							<span className="title">Détails de produit</span>

							<div className="fields">
								<SimpleInput
									placeholder="Intitulé"
									type="text"
									name="intitule"
									handleChange={handleChange}
									itemValue={item.intitule}
								/>
								<SimpleOptionInput
									placeholder="Unité de mesure"
									options={unite_de_mesure}
									name="uniteMesure"
									handleChange={handleChange}
									itemValue={item.uniteMesure}
								/>
								<SimpleInput
									placeholder="Prix unitaire"
									type="text"
									name="prixUnitaire"
									handleChange={handleChange}
									itemValue={item.prixUnitaire}
								/>
								<SimpleInput
									placeholder="Quantité en stock"
									type="text"
									name="quantiteStock"
									handleChange={handleChange}
									itemValue={item.quantiteStock}
								/>
								<SimpleInput
									placeholder="Seuil"
									type="text"
									name="seuil"
									handleChange={handleChange}
									itemValue={item.seuil}
								/>
								<SimpleInput
									placeholder="Lieu de stockage"
									type="text"
									name="lieuStockage"
									handleChange={handleChange}
									itemValue={item.lieuStockage}
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
