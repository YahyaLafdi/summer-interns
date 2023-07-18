import { useCallback, useEffect, useRef, useState } from "react";
import "./../addStyle.scss";
import UpdateProfilePicture from "../../profilePicture/UpdateProfilePicture";
import getCroppedImg from "../../../utils/getCroppedImg";
import SimpleInput from "../../inputs/simpleInput";
import SimpleOptionInput from "../../inputs/simpleOptionInput";
import axios from "axios";
import * as XLSX from "xlsx";

import { Link } from "react-router-dom";

export default function AddPersonnel({ visible, activeTab, setLoading, refetch, setRefetch }) {
	const refInput = useRef(null);
	const [image, setImage] = useState(
		"https://res.cloudinary.com/deqm1j9ey/image/upload/v1680881071/Kitcoop/default_pic_bdegda.png"
	);
	const fields = {
		matricule: "",
		isAdherent: "",
		nom: "",
		prenom: "",
		niveauEtudes: "",
		sexe: "",
		photoUrl: "",
		ddn: "",
		fonction: "",
		cin: "",
		cnss: "",
		adresse: "",
		ville: "",
		dateEmbauche: "",
		basePaiement: "",
		tauxPaiement: "",
		isDeclareCnss: "",
		telephone: "",
		situationFamiliale: "",
		nombreEnfants: "",
		dateDepart: "",
	};

	const [isDeclaredByCNSS, setIsDeclaredByCNSS] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);

	const handleDeclaredByCNSSChange = (event) => {
		handleChange(event);
		setIsDeclaredByCNSS(event.target.value === "true");
		setIsDisabled(false);
	};
	const handleSecondInputHover = () => {
		if (isDisabled) {
			alert("Second input field is disabled!");
		}
	};
	//=============================================================

	const [error, setError] = useState("");
	const handleImage = (e) => {
		let file = e.target.files[0];
		if (file === undefined) {
			return;
		}
		if (
			file.type !== "image/jpeg" &&
			file.type !== "image/png" &&
			file.type !== "image/webp" &&
			file.type !== "image/gif"
		) {
			setError(`${file.name} format is not supported.`);
			return;
		} else if (file.size > 1024 * 1024 * 5) {
			setError(`${file.name} is too large max 5mb allowed.`);
			return;
		}

		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (event) => {
			setImage(event.target.result);
		};
	};
	//=============================================================

	//=============================================================
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
	const [zoom, setZoom] = useState(1);
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [show, setShow] = useState(false);

	const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels);
	}, []);

	const getCroppedImage = useCallback(
		async (show) => {
			try {
				const img = await getCroppedImg(image, croppedAreaPixels);
				if (show) {
					setZoom(1);
					setCrop({ x: 0, y: 0 });
					setImage(img);
					console.log("just show");
				} else {
					console.log("not show");
					console.log(img);

					return img;
				}
			} catch (error) {
				console.log(error);
			}
		},
		[croppedAreaPixels]
	);
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

	const uploadComp = () => {
		setShow(true);
		refInput.current.click();
	};

	const sexe = [
		{ key: "Féminine", value: "Féminine" },
		{ key: "Masculine", value: "Masculine" },
	];
	const oui_non = [
		{ key: "true", value: "Oui" },
		{ key: "false", value: "Non" },
	];
	const situation_familiale = [
		{ key: "Marié(e)", value: "Marié(e)" },
		{ key: "Célébataire", value: "Célébataire" },
		{ key: "Divorcé(e)", value: "Divorcé(e)" },
		{ key: "Veuf(ve)", value: "Veuf(ve)" },
	];
	const niveau_etudes = [
		{ key: "Sans niveau", value: "Sans niveau" },
		{ key: "Primaire", value: "Primaire" },
		{ key: "Secondaire", value: "Secondaire" },
		{ key: "Lycée", value: "Lycée" },
		{ key: "Supérieur", value: "Supérieur" },
	];
	const Base_de_paiement = [
		{ key: "Horaire", value: "Horaire" },
		{ key: "Hebdomadaire", value: "Hebdomadaire" },
		{ key: "Quinzaine", value: "Quinzaine" },
		{ key: "mensuelle", value: "mensuelle" },
	];

	const [formInfos, setFormInfos] = useState(fields);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormInfos({ ...formInfos, [name]: value });
	};

	const doAdd = async () => {
		try {
			setLoading(true);
			console.log("start upload with this : " + image);
			const imageUrl = await uploadImage(image);
			console.log("end upload");
			const updatedFields = {
				...formInfos,
				photoUrl: imageUrl,
			};
			console.log(updatedFields);
			await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/${activeTab}s`, updatedFields);
			setLoading(false);
			visible(false);
			setRefetch(!refetch);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	const uploadImage = async (img) => {
		const blob = await fetch(img).then((r) => r.blob());
		const reader = new FileReader();
		reader.readAsDataURL(blob);
		console.log("before");
		return new Promise((resolve, reject) => {
			reader.onload = async () => {
				console.log("onload");
				const base64data = reader.result;
				const formData = new FormData();
				formData.append("file", base64data);
				formData.append("upload_preset", "issampreset");
				console.log("file and perset added + start cloud api");

				const response = await axios.post(`https://api.cloudinary.com/v1_1/deqm1j9ey/auto/upload`, formData);
				console.log(response.data.secure_url);
				resolve(response.data.secure_url);
				console.log("resolve ended");
			};
		});
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
			if (fileName !== "Personnels") {
				alert('Le fichier ne concerne pas les Personnels, vérifier son nom ! Le nom attendu : "Personnels"');
				return;
			}

			const extractedData = jsonData.slice(1).map((row) => ({
				photoUrl:
					"https://res.cloudinary.com/deqm1j9ey/image/upload/v1680881071/Kitcoop/default_pic_bdegda.png",
				matricule: row[0],
				isAdherent: row[1] === "Oui" ? true : false,
				sexe: row[2],
				isDeclareCnss: row[3] === "Oui" ? true : false,
				cnss: row[4],
				fonction: row[5],
				nom: row[6],
				prenom: row[7],
				ddn: row[8],
				cin: row[9],
				telephone: row[10],
				adresse: row[11],
				ville: row[12],
				niveauEtudes: row[13],
				tauxPaiement: row[14],
				basePaiement: row[15],
				dateEmbauche: row[16],
				situationFamiliale: row[17],
				nombreEnfants: row[18],
				dateDepart: row[19],
			}));

			console.log(extractedData);

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
				<header>Ajouter un personnel</header>

				<form action="#">
					<input
						type="file"
						ref={refInput}
						onChange={handleImage}
						accept="image/jpeg,image/png,image/webp,image/gif"
						hidden
					/>
					<div className="form first">
						<div className="details personal">
							<span className="title">Détails Personnels</span>
							<div className="profile_img_wrap">
								<div className="profile_w_left">
									<div className="profile_w_img">
										<div
											className="profile_w_bg"
											style={{
												backgroundSize: "cover",
												backgroundImage: `url(${image})`,
											}}
										></div>
										<div className="profile_circle hover1" onClick={() => uploadComp()}>
											<img src="./images/icons/camera.png" alt="" />
										</div>
									</div>
								</div>
							</div>
							<div className="drag-area">
								<span className="uploadHeader">Extraire les donneés á partir d'un fichier Excel</span>
								<span>OU</span>
								<Link className="uploadBtn">Parcourir</Link>
								<input hidden type="file" id="fileInput" accept=".xlsx, .xls" onChange={handleFileChange} />
							</div>

							<div className="fields">
								<SimpleInput
									placeholder="Matricule"
									type="text"
									name="matricule"
									handleChange={handleChange}
								/>
								<SimpleInput placeholder="Nom" type="text" name="nom" handleChange={handleChange} />
								<SimpleInput placeholder="Prénom" type="text" name="prenom" handleChange={handleChange} />
								<SimpleOptionInput
									placeholder="Sexe"
									options={sexe}
									name="sexe"
									handleChange={handleChange}
								/>
								<SimpleOptionInput
									placeholder="Situation familiale"
									options={situation_familiale}
									name="situationFamiliale"
									handleChange={handleChange}
								/>
								<SimpleInput placeholder="CIN" type="text" name="cin" handleChange={handleChange} />
								<SimpleInput placeholder="Adresse" type="text" name="adresse" handleChange={handleChange} />
								<SimpleInput placeholder="Ville" type="text" name="ville" handleChange={handleChange} />
								<SimpleInput
									placeholder="Date de naissance"
									type="date"
									name="ddn"
									handleChange={handleChange}
								/>
								<SimpleInput
									placeholder="Tétéphone"
									type="tel"
									name="telephone"
									handleChange={handleChange}
								/>
								<SimpleInput
									placeholder="Nombre d'enfants"
									type="number"
									name="nombreEnfants"
									handleChange={handleChange}
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
							<span className="title">Details Professionels</span>

							<div className="fields">
								<SimpleOptionInput
									placeholder="Niveau d'études"
									options={niveau_etudes}
									name="niveauEtudes"
									handleChange={handleChange}
								/>
								<SimpleInput placeholder="Fonction" type="text" name="fonction" handleChange={handleChange} />
								<SimpleInput
									placeholder="Date d'embauche"
									type="date"
									name="dateEmbauche"
									handleChange={handleChange}
								/>
								<SimpleOptionInput
									placeholder="Base de paiement"
									options={Base_de_paiement}
									name="basePaiement"
									handleChange={handleChange}
								/>
								<SimpleInput
									placeholder="Taux de paiement"
									type="text"
									name="tauxPaiement"
									handleChange={handleChange}
								/>

								<div className="input-field">
									<label>Déclaré(e) à la CNSS</label>
									<select onChange={handleDeclaredByCNSSChange} name="isDeclareCnss">
										<option disabled defaultValue>
											Selectionner
										</option>
										<option value="false">Non</option>
										<option value="true">Oui</option>
									</select>
								</div>
								<div className="input-field">
									<label>Numéro CNSS</label>
									<input
										type="text"
										placeholder="Numéro CNSS"
										disabled={isDeclaredByCNSS ? false : true}
										onMouseOver={handleSecondInputHover}
										name="cnss"
										onChange={handleChange}
									/>
									{isDisabled && (
										<span className="disabled-icon" title="This field is disabled">
											🚫
										</span>
									)}
								</div>

								<SimpleOptionInput
									placeholder="Adherent"
									options={oui_non}
									name="isAdherent"
									handleChange={handleChange}
								/>
								<SimpleInput
									placeholder="Date de départ"
									type="date"
									name="dateDepart"
									handleChange={handleChange}
								/>

								<div className="input-field">
									<label>Renseignements divers</label>
									<textarea
										placeholder="Renseignements divers"
										name="renseignements"
										onChange={handleChange}
									/>
								</div>
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
			{show && (
				<UpdateProfilePicture
					setZoom={setZoom}
					crop={crop}
					setCrop={setCrop}
					zoom={zoom}
					getCroppedImage={getCroppedImage}
					onCropComplete={onCropComplete}
					setImage={setImage}
					image={image}
					setShow={setShow}
				/>
			)}
		</div>
	);
}
