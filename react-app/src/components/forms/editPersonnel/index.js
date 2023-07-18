import React, { useCallback, useEffect, useRef, useState } from "react";
import "./../addStyle.scss";
import getCroppedImg from "../../../utils/getCroppedImg";
import SimpleInput from "../../inputs/simpleInput";
import SimpleOptionInput from "../../inputs/simpleOptionInput";
import axios from "axios";
import { Link } from "react-router-dom";
import UpdateProfilePicture from "../../profilePicture/UpdateProfilePicture";

export default function EditPersonnel({ visible, activeTab, setLoading, refetch, setRefetch, item }) {
	const refInput = useRef(null);
	const [image, setImage] = useState(item.photoUrl);
	const fields = {
		matricule: item.matricule,
		isAdherent: item.isAdherent,
		nom: item.nom,
		prenom: item.prenom,
		niveauEtudes: item.niveauEtudes,
		sexe: item.sexe,
		photoUrl: item.photoUrl,
		ddn: item.ddn,
		fonction: item.fonction,
		cin: item.cin,
		cnss: item.cnss,
		adresse: item.adresse,
		ville: item.ville,
		dateEmbauche: item.dateEmbauche,
		basePaiement: item.basePaiement,
		tauxPaiement: item.tauxPaiement,
		isDeclareCnss: item.isDeclareCnss,
		telephone: item.telephone,
		situationFamiliale: item.situationFamiliale,
		nombreEnfants: item.nombreEnfants,
		dateDepart: item.dateDepart,
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
			await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/${activeTab}s/${item.id}`, updatedFields);
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
	useEffect(() => {
		console.log(formInfos);
	});
	return (
		<div className="blur">
			<div className="container">
				<i className="fa-solid fa-xmark" onClick={() => visible(false)}></i>
				<header>Modifier un personnel</header>

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

							<div className="fields">
								<SimpleInput
									placeholder="Matricule"
									type="text"
									name="matricule"
									handleChange={handleChange}
									itemValue={item.matricule}
								/>
								<SimpleInput
									placeholder="Nom"
									type="text"
									name="nom"
									handleChange={handleChange}
									itemValue={item.nom}
								/>
								<SimpleInput
									placeholder="Prénom"
									type="text"
									name="prenom"
									handleChange={handleChange}
									itemValue={item.prenom}
								/>
								<SimpleOptionInput
									placeholder="Sexe"
									options={sexe}
									name="sexe"
									handleChange={handleChange}
									itemValue={item.sexe}
								/>
								<SimpleOptionInput
									placeholder="Situation familiale"
									options={situation_familiale}
									name="situationFamiliale"
									handleChange={handleChange}
									itemValue={item.situationFamiliale}
								/>
								<SimpleInput
									placeholder="CIN"
									type="text"
									name="cin"
									handleChange={handleChange}
									itemValue={item.cin}
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
									placeholder="Date de naissance"
									type="date"
									name="ddn"
									handleChange={handleChange}
									itemValue={item.ddn}
								/>
								<SimpleInput
									placeholder="Tétéphone"
									type="tel"
									name="telephone"
									handleChange={handleChange}
									itemValue={item.telephone}
								/>
								<SimpleInput
									placeholder="Nombre d'enfants"
									type="number"
									name="nombreEnfants"
									handleChange={handleChange}
									itemValue={item.nombreEnfants}
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
									itemValue={item.niveauEtudes}
								/>
								<SimpleInput
									placeholder="Fonction"
									type="text"
									name="fonction"
									handleChange={handleChange}
									itemValue={item.fonction}
								/>
								<SimpleInput
									placeholder="Date d'embauche"
									type="date"
									name="dateEmbauche"
									handleChange={handleChange}
									itemValue={item.dateEmbauche}
								/>
								<SimpleOptionInput
									placeholder="Base de paiement"
									options={Base_de_paiement}
									name="basePaiement"
									handleChange={handleChange}
									itemValue={item.basePaiement}
								/>
								<SimpleInput
									placeholder="Taux de paiement"
									type="text"
									name="tauxPaiement"
									handleChange={handleChange}
									itemValue={item.tauxPaiement}
								/>

								<div className="input-field">
									<label>Déclaré(e) par CNSS</label>
									<select
										onChange={handleDeclaredByCNSSChange}
										name="isDeclareCnss"
										defaultValue={item.isDeclareCnss}
									>
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
										defaultValue={item.cnss}
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
									itemValue={item.isAdherent}
								/>
								<SimpleInput
									placeholder="Date de départ"
									type="date"
									name="dateDepart"
									handleChange={handleChange}
									itemValue={item.dateDepart}
								/>

								<div className="input-field">
									<label>Rensignements divers</label>
									<textarea
										placeholder="Rensignements divers"
										name="renseignements"
										onChange={handleChange}
										defaultValue={item.renseignements}
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
