import { useEffect, useState } from "react";
import "./../addStyle.scss";
import SimpleInput from "../../inputs/simpleInput";
import axios from "axios";
import { Link } from "react-router-dom";
import SimpleOptionInput from "../../inputs/simpleOptionInput";
import * as XLSX from "xlsx";

export default function AddAchat({
	visible,
	activeTab,
	setLoading,
	refetch,
	setRefetch,
	additionalDataFournisseurs,
	additionalDataMatieres,
}) {
	const fields = {
		nomFournisseur: "",
		idMatiere: "",
		prixUnitaire: 0,
		quantite: 0,
		dateCommande: "",
		tva: 0,
		status: false,
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
	console.log(formInfos);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onload = async function (e) {
			const data = new Uint8Array(e.target.result);
			const workbook = XLSX.read(data, { type: "array" });
			const worksheet = workbook.Sheets[workbook.SheetNames[0]];
			const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

			const fileName = file.name.split(".")[0];
			if (fileName !== "Produits") {
				alert('Le fichier ne concerne pas les produits, vérifier son nom ! Le nom attendu : "Produits"');
				return;
			}

			const extractedData = jsonData.slice(1).map((row) => ({
				intitule: row[0],
				uniteMesure: row[1].trim(),
				prixUnitaire: parseFloat(row[2]),
				quantiteStock: parseFloat(row[3]),
				seuil: parseFloat(row[4]),
				lieuStockage: row[5],
			}));

			setFormInfos({ ...formInfos, produits: extractedData });
			console.log(extractedData);
			try {
				setLoading(true);
				await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/${activeTab}s-list`, extractedData);
				setLoading(false);
				visible(false);
				setRefetch(!refetch);
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		};

		reader.readAsArrayBuffer(file);
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

	const getAllFournisseurs = additionalDataFournisseurs.data.data;
	const fournisseurs = getAllFournisseurs.map((fournisseur) => {
		return { key: fournisseur.nom, value: fournisseur.nom };
	});
	const getAllMatieres = additionalDataMatieres.data.data;
	const matieres = getAllMatieres.map((mat) => {
		return { key: mat.id, value: mat.intitule };
	});

	return (
		<div className="blur">
			<div className="container">
				<i className="fa-solid fa-xmark" onClick={() => visible(false)}></i>
				<header>Effectuer un achat</header>

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
								/>
								<SimpleOptionInput
									placeholder="Matiere ou fourniture"
									options={matieres}
									name="idMatiere"
									handleChange={handleChange}
								/>
								<SimpleInput
									placeholder="Prix unitaire"
									type="number"
									name="prixUnitaire"
									handleChange={handleChange}
								/>
								<SimpleInput
									placeholder="Quantité"
									type="number"
									name="quantite"
									handleChange={handleChange}
								/>
								<SimpleInput placeholder="TVA" type="number" name="tva" handleChange={handleChange} />
								<SimpleInput
									placeholder="Date de la commande"
									type="date"
									name="dateCommande"
									handleChange={handleChange}
								/>
								<label className="check-container">
									Déja traité ?
									<input type="checkbox" name="status" onChange={handleCheckChange} />
									<span className="checkmark"></span>
								</label>
							</div>
						</div>

						<Link className="backBtn submit" onClick={doAdd}>
							<span className="btnText">Effectuer</span>
							<i className="uil uil-navigator"></i>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
