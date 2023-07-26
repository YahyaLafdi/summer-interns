import React, { useCallback, useEffect, useRef, useState } from "react";
import "./../addStyle.scss";
import getCroppedImg from "../../../utils/getCroppedImg";
import SimpleInput from "../../inputs/simpleInput";
import SimpleOptionInput from "../../inputs/simpleOptionInput";
import axios from "axios";
import { Link } from "react-router-dom";
import UpdateProfilePicture from "../../profilePicture/UpdateProfilePicture";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { adherentDetails, adherentDetails2, adherentValidation1, adherentValidation2 } from "../addAdherent/utils";
import { initialValues1 } from "../addAdherent";

export default function EditAdherent({ visible, activeTab, setLoading, refetch, setRefetch, item }) {
	const refInput = useRef(null);
	const [image, setImage] = useState(item.photoUrl);
	const fields = {
		photoUrl: item.photoUrl,
		nom: item.nom,
		prenom: item.prenom,
		ddn: item.ddn,
		cin: item.cin,
		telephone: item.telephone,
		adresse: item.adresse,
		ville: item.ville,
		niveauEtudes: item.niveauEtudes,
		dda: item.dda,
		ddd: item.ddd,
		motif: item.motif,
		nbrPartSociale: item.nbrPartSociale,
		situationFamiliale: item.situationFamiliale,
		nbrEnfant: item.nbrEnfant,
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

	const [formInfos, setFormInfos] = useState(fields);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormInfos({ ...formInfos, [name]: value });
	};
	const [ajoutOk, setAjoutOk] = useState(false);
	useEffect(() => {
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
		if(ajoutOk){
			doAdd()
			setAjoutOk(false)
		}
	}, [ajoutOk])
	

	
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
	}, [formInfos]);
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
							<Formik
                initialValues={item}
                validationSchema={adherentValidation1}
              >
                {(props) => (
                  <Form>
                    <div className="fields">
                      {adherentDetails.map((elt) => (
                        <div className="input-field">
                          <label>{elt.label}</label>
                          {elt.type === "select" ? (
<>
                            <Field as="select" name={elt.name}>
                              <option value="" disabled selected>
                                {elt.placeholder}
                              </option>
                              {elt?.options?.map((op) => (
                                <option value={op.key}>{op.value} </option>
                              ))}
                            </Field>
							<ErrorMessage
								name={elt.name}
								component="div"
								className="error"
							/>
</>
                          ) : elt.name === "nombreEnfants" ? (
                            <>
                              <Field
                                type={elt.type}
                                placeholder={elt.placeholder}
                                name={elt.name}
                                options={elt.options}
                                validate={elt.validate}
                                onChange={(e) => {
                                  //setNbEnfants(e.target.value);
                                  const { value } = e.target;
                                  const enfants = Array.from(
                                    { length: value },
                                    () => ({
                                      nom: "",
                                      isScolarised: false,
                                      ddn: "",
                                    })
                                  );
                                  //console.log(enfants);
                                  props.setFieldValue("enfants", enfants);
                                  props.handleChange(e);
                                }}
                              />
                              <ErrorMessage
                                name={elt.name}
                                className="error"
                                component="div"
                              />
                            </>
                          ) : (
                            <>
                              <Field
                                type={elt.type}
                                placeholder={elt.placeholder}
                                name={elt.name}
                                options={elt.options}
                                validate={elt.validate}
                              />
                              <ErrorMessage
                                name={elt.name}
                                className="error"
                                component="div"
                              />
                            </>
                          )}
                        </div>
                      ))}
                      
                    </div>

                    <button
                      disabled={!props.isValid }
                      onClick={() =>
                        setFormInfos((x) => ({ ...x, ...props.values }))
                      }
                      className="nextBtn"
                      type="button"
                    >
                      <span className="btnText">Suivant</span>
                      <i className="uil uil-navigator"></i>
                    </button>
                  </Form>
                )}
              </Formik>

							{/*<div className="fields">
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
								<SimpleInput
									placeholder="Date de naissance"
									type="date"
									name="ddn"
									handleChange={handleChange}
									itemValue={item.ddn}
								/>
								<SimpleInput
									placeholder="CIN"
									type="text"
									name="cin"
									handleChange={handleChange}
									itemValue={item.cin}
								/>
								<SimpleInput
									placeholder="Téléphone"
									type="text"
									name="telephone"
									handleChange={handleChange}
									itemValue={item.telephone}
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
								<SimpleOptionInput
									placeholder="Niveau d'études"
									options={niveau_etudes}
									name="niveauEtudes"
									handleChange={handleChange}
									itemValue={item.niveauEtudes}
								/>
								<SimpleInput
									placeholder="Date d'adhésion"
									type="date"
									name="dda"
									handleChange={handleChange}
									itemValue={item.dda}
								/>
							</div>*/}
						</div>

						{/*<button className="nextBtn" type="button">
							<span className="btnText">Suivant</span>
							<i className="uil uil-navigator"></i>
						</button>*/}
					</div>

					<div className="form second">
						<div className="details address">
							<span className="title">Details Professionels</span>

							<Formik initialValues={formInfos} validationSchema={adherentValidation2} >
                {(props) => (
                  <Form>
                    <div className="fields">
                      {adherentDetails2.map((elt) => (
                        <div className="input-field">
                          <label>{elt.label}</label>
                          {elt.type === "select" ? (
                            <Field as="select" name={elt.name}>
                              <option value="" disabled selected>
                                {elt.placeholder}
                              </option>
                              {elt?.options?.map((op) => (
                                <option value={op.key}>{op.value} </option>
                              ))}
                            </Field>
                          ) : elt.name === "nombreEnfants" ? (
                            <>
                              <Field
                                type={elt.type}
                                placeholder={elt.placeholder}
                                name={elt.name}
                                options={elt.options}
                                validate={elt.validate}
                                onChange={(e) => {
                                  //setNbEnfants(e.target.value);
                                  const { value } = e.target;
                                  const enfants = Array.from(
                                    { length: value },
                                    () => ({
                                      nom: "",
                                      isScolarised: false,
                                      ddn: "",
                                    })
                                  );
                                  //console.log(enfants);
                                  props.setFieldValue("enfants", enfants);
                                  props.handleChange(e);
                                }}
                              />
                              <ErrorMessage
                                name={elt.name}
                                className="error"
                                component="div"
                              />
                            </>
                          ) : (
                            <>
                              <Field
                                type={elt.type}
                                placeholder={elt.placeholder}
                                name={elt.name}
                                options={elt.options}
                                validate={elt.validate}
                              />
                              <ErrorMessage
                                name={elt.name}
                                className="error"
                                component="div"
                              />
                            </>
                          )}
                        </div>
                      ))}
                    </div>
					{props.values.nombreEnfants > 0 && (
                        <div>
                          <p className="title">Ajouter vous enfants ici</p>
                          {props.values.enfants.map((enfant, index) => (
                            <div className="enfants">
                              {/*<p>Enfant N° {index + 1}</p>*/}
                              <div className="enfant-input">
                                <div className="enfant nom input-field">
                                  <label htmlFor="nom">Nom de l'enfant n° {index+1} </label>
                                  <Field
                                    type="text"
                                    name={`enfants[${index}].nom`}
                                    placeholder="nom"
                                  />								  
                                </div>
								<div className="ddnScol">
                                <div className="enfant input-field">
                                  <label htmlFor="ddn">Date de naissance</label>
                                  <Field
                                    type="date"
                                    name={`enfants[${index}].ddn`}
                                  />
                                </div>
                                <div className="enfant input-field scol">
                                  <label htmlFor="isScolarised">
                                    Scolarisé
                                  </label>
                                  <Field
                                    type="checkbox"
                                    name={`enfants[${index}].isScolarised`}
                                  />
                                </div>
								</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
					  <div className="buttons">
                      <div className="backBtn">
                        <i className="uil uil-navigator"></i>
                        <span className="btnText">précédent</span>
                      </div>

                      <Link
                        className="backBtn submit"
                        onClick={() => {
                          if (!props.isValid ) {
                          } else {
                            setFormInfos((x) => ({ ...x, ...props.values }));
                            setAjoutOk(true);
                          }
                        }}
                      >
                        <span className="btnText">Enregistrer</span>
                        <i className="uil uil-navigator"></i>
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>

							{/*<div className="fields">
								<SimpleInput
									placeholder="Date de départ"
									type="date"
									name="ddd"
									handleChange={handleChange}
									itemValue={item.ddd}
								/>
								<SimpleInput
									placeholder="Motifs de depart"
									type="text"
									name="motif"
									handleChange={handleChange}
									itemValue={item.motif}
								/>
								<SimpleInput
									placeholder="Nombre de parts sociales"
									type="text"
									name="nbrPartSociale"
									handleChange={handleChange}
									itemValue={item.nbrPartSociale}
								/>
								<SimpleOptionInput
									placeholder="Situation familiale"
									options={situation_familiale}
									name="situationFamiliale"
									handleChange={handleChange}
									itemValue={item.situationFamiliale}
								/>
								<SimpleInput
									placeholder="Nombre d'enfants"
									type="number"
									name="nombreEnfants"
									handleChange={handleChange}
									itemValue={item.nbrEnfant}
								/>
							</div>*/}
						</div>

						{/*<div className="buttons">
							<div className="backBtn">
								<i className="uil uil-navigator"></i>
								<span className="btnText">précédent</span>
							</div>

							<Link className="backBtn submit" onClick={doAdd}>
								<span className="btnText">Enregistrer</span>
								<i className="uil uil-navigator"></i>
							</Link>
						</div>*/}
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
