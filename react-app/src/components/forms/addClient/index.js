import { useEffect, useState } from "react";
import "./../addStyle.scss";
import SimpleInput from "../../inputs/simpleInput";
import axios from "axios";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

export default function AddClient({ visible, activeTab, setLoading, refetch, setRefetch }) {
	const fields = {
		nom: "",
		pays: "",
		adresse: "",
		ville: "",
		nomContact: "",
		teleContact: "",
		cin: "",
		rc: "",
		tp: "",
		if_valid: "",
		ice: "",
		telephone: "",
		fax: "",
		email: "",
		siteWeb: "",
	};

	//=============================================================
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onload = async function (e) {
			const data = new Uint8Array(e.target.result);
			const workbook = XLSX.read(data, { type: "array" });
			const worksheet = workbook.Sheets[workbook.SheetNames[0]];
			const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

			const fileName = file.name.split(".")[0];
			if (fileName !== "Clients") {
				alert('Le fichier ne concerne pas les clients, vérifier son nom ! Le nom attendu : "Clients"');
				return;
			}

			const extractedData = jsonData.slice(1).map((row) => ({
				nom: row[0],
				pays: row[1],
				adresse: row[2],
				ville: row[3],
				nomContact: row[4],
				teleContact: row[5],
				cin: row[6],
				rc: row[7],
				tp: row[8],
				if_valid: row[9],
				ice: row[10],
				telephone: row[11],
				fax: row[12],
				email: row[13],
				siteWeb: row[14],
			}));
			const definedData = extractedData.filter((obj) => obj.nom !== undefined);

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
		};

		reader.readAsArrayBuffer(file);
	};

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
				<header>Ajouter un client</header>

				<form action="#">
					<div className="form first">
						<div className="details personal">
							<span className="title">Détails de client</span>
							<div className="drag-area">
								<span className="uploadHeader">Extraire les donneés á partir d'un fichier Excel</span>
								<span>OU</span>
								<Link className="uploadBtn">Parcourir</Link>
								<input hidden type="file" id="fileInput" accept=".xlsx, .xls" onChange={handleFileChange} />
							</div>

							<div className="fields">
								<SimpleInput placeholder="Nom" type="text" name="nom" handleChange={handleChange} />
								<SimpleInput placeholder="Pays" type="text" name="pays" handleChange={handleChange} />
								<SimpleInput placeholder="Adresse" type="text" name="adresse" handleChange={handleChange} />
								<SimpleInput placeholder="Ville" type="text" name="ville" handleChange={handleChange} />
								<SimpleInput
									placeholder="Nom du contact"
									type="text"
									name="nomContact"
									handleChange={handleChange}
								/>
								<SimpleInput
									placeholder="Téléphone du contact"
									type="text"
									name="teleContact"
									handleChange={handleChange}
								/>
								<SimpleInput placeholder="CIN" type="text" name="cin" handleChange={handleChange} />
								<SimpleInput placeholder="RC" type="text" name="rc" handleChange={handleChange} />
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
								<SimpleInput placeholder="TP" type="text" name="tp" handleChange={handleChange} />
								<SimpleInput placeholder="IF" type="text" name="if_valid" handleChange={handleChange} />
								<SimpleInput placeholder="ICE" type="text" name="ice" handleChange={handleChange} />
								<SimpleInput
									placeholder="Téléphone"
									type="text"
									name="telephone"
									handleChange={handleChange}
								/>
								<SimpleInput placeholder="FAX" type="text" name="fax" handleChange={handleChange} />
								<SimpleInput placeholder="Email" type="text" name="email" handleChange={handleChange} />
								<SimpleInput placeholder="Site Web" type="text" name="siteWeb" handleChange={handleChange} />
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
