import { useEffect, useState } from "react";
import "./../addStyle.scss";
import SimpleInput from "../../inputs/simpleInput";
import axios from "axios";
import { Link } from "react-router-dom";
import SimpleOptionInput from "../../inputs/simpleOptionInput";
import * as XLSX from "xlsx";

export default function AddProduit({ visible, activeTab, setLoading, refetch, setRefetch }) {
	const fields = {
		intitule: "",
		uniteMesure: "",
		prixUnitaire: 0,
		seuil: 0,
		lieuStockage: "",
		produits: [],
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
				
				seuil: parseFloat(row[3]),
				lieuStockage: row[4],
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

	useEffect(() => {
		//selecting all required elements
		const dropArea = document.querySelector(".drag-area");
		const dragText = dropArea.querySelector(".uploadHeader");
		const button = dropArea.querySelector("a"),
			input = dropArea.querySelector("input");
		let file; //this is a global variable and we'll use it inside multiple functions
		button.onclick = () => {
			input.click(); //if user click on the button then the input also clicked
		};

		input.addEventListener("change", function () {
			//getting user select file and [0] this means if user select multiple files then we'll select only the first one
			file = this.files[0];
			dropArea.classList.add("active");
		});

		//If user Drag File Over DropArea
		dropArea.addEventListener("dragover", (event) => {
			event.preventDefault(); //preventing from default behaviour
			dropArea.classList.add("active");
			dragText.textContent = "Release to Upload File";
		});

		//If user leave dragged File from DropArea
		dropArea.addEventListener("dragleave", () => {
			dropArea.classList.remove("active");
			dragText.textContent = "Drag & Drop to Upload File";
		});

		//If user drop File on DropArea
		dropArea.addEventListener("drop", (event) => {
			event.preventDefault(); //preventing from default behaviour
			file = event.dataTransfer.files[0];

			const fileInput = document.getElementById("fileInput");
			fileInput.value = ""; // Clear the previously selected file
			fileInput.files = event.dataTransfer.files;
			fileInput.dispatchEvent(new Event("change", { bubbles: true }));
		});
	});

	return (
		<div className="blur">
			<div className="container">
				<i className="fa-solid fa-xmark" onClick={() => visible(false)}></i>
				<header>Ajouter un produit</header>

				<form action="#">
					<div className="form first">
						<div className="details personal">
							<span className="title">Détails de produit</span>
							<div className="drag-area">
								<span className="uploadHeader">Extraire les donneés á partir d'un fichier Excel</span>
								<span>OU</span>
								<Link className="uploadBtn">Parcourir</Link>
								<input hidden type="file" id="fileInput" accept=".xlsx, .xls" onChange={handleFileChange} />
							</div>

							<div className="fields">
								<SimpleInput placeholder="Intitulé" type="text" name="intitule" handleChange={handleChange} />
								<SimpleOptionInput
									placeholder="Unité de mesure"
									options={unite_de_mesure}
									name="uniteMesure"
									handleChange={handleChange}
								/>
								<SimpleInput
									placeholder="Prix unitaire"
									type="text"
									name="prixUnitaire"
									handleChange={handleChange}
								/>
								
								<SimpleInput placeholder="Seuil" type="text" name="seuil" handleChange={handleChange} />
								<SimpleInput
									placeholder="Lieu de stockage"
									type="text"
									name="lieuStockage"
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
