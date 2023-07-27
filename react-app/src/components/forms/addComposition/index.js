import { useEffect, useState } from "react";
import "./../addStyle.scss";
import SimpleInput from "../../inputs/simpleInput";
import SimpleOptionInput from "../../inputs/simpleOptionInput";
import axios from "axios";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

export default function AddComposition({
	visible,
	activeTab,
	setLoading,
	refetch,
	setRefetch,
	additionalDataFournisseurs,
	additionalDataMatieres,
	
}) {
	const fields = {
		produit: "",
		matiere: "",
		quantite: "",
		//seuil: 0,
	};

	const getAllMatiers = additionalDataMatieres.data.data;
	const matieres = getAllMatiers.map((matiere) => {
		
		return { key: matiere.intitule, value: matiere.intitule };
	});
	/*const getAllProduits = additionalDataFournisseurs.data.data;
	const produits = getAllProduits.map((produit) => {
		console.log(produit);
		return { key: produit.intitule, value: produit.intitule };
	});*/

	//=============================================================
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();

		const fileName = file.name.split(".")[0];
		if (fileName !== "Matieres") {
			alert(
				'Le fichier ne concerne pas les matieres et fournitures, vérifier son nom ! Le nom attendu : "Matieres"'
			);
			return;
		}

		reader.onload = async function (e) {
			const data = new Uint8Array(e.target.result);
			const workbook = XLSX.read(data, { type: "array" });
			const worksheet = workbook.Sheets[workbook.SheetNames[0]];
			const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

			const extractedData = jsonData.slice(1).map((row) => ({
				intitule: row[0],
				famille: row[1],
				region: row[2],
				quantite: parseFloat(row[3]),
				seuil: parseFloat(row[4]),
				nommatiere: (row[5] ?? "").trim(),
			}));

			const allowedmatieres = matieres.map((matiere) => matiere.key);
			const definedData = extractedData.filter((obj) => obj.intitule !== undefined);

			const isValidNommatiere = definedData.every((obj) =>
				allowedmatieres.includes(obj.nommatiere)
			);

			if (isValidNommatiere) {
				console.log("All values in nom matiere are allowed.");
				setFormInfos({ ...formInfos, produits: definedData });
				try {
					setLoading(true);
					await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/${activeTab}s-list`, definedData);
					setLoading(false);
					visible(false);
					setRefetch(!refetch);
				} catch (error) {
					setLoading(false);
					console.log(error);
				}
			} else {
				alert("Un ou plusieurs noms des matieres n'existent pas en base de données.");
				return;
			}
		};

		reader.readAsArrayBuffer(file);
	};

	//=============================================================

	//=============================================================

	//=============================================================

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
				<header>Ajouter une matiere/fourniture</header>

				<form action="#">
					<div className="form first">
						<div className="details personal">
							<span className="title">Détails du matiere/fourniture</span>
							<div className="drag-area">
								<span className="uploadHeader">Extraire les donneés á partir d'un fichier Excel</span>
								<span>OU</span>
								<Link className="uploadBtn">Parcourir</Link>
								<input hidden type="file" id="fileInput" accept=".xlsx, .xls" onChange={handleFileChange} />
							</div>
							<div className="fields">
							<SimpleInput
									placeholder="Produit"
									type="text"
									name="nomProduit"
									handleChange={handleChange}
								/>								
								<SimpleOptionInput
									placeholder="Matieres"
									options={matieres}
									name="nommatiere"
									handleChange={handleChange}
								/>
								<SimpleInput
									placeholder="Quantité"
									type="text"
									name="quantite"
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
