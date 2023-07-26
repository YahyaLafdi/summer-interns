import React, { useCallback, useEffect, useRef, useState } from "react";
import "./../addStyle.scss";
import getCroppedImg from "../../../utils/getCroppedImg";
import SimpleInput from "../../inputs/simpleInput";
import SimpleOptionInput from "../../inputs/simpleOptionInput";
import axios from "axios";
import { Link } from "react-router-dom";
import UpdateProfilePicture from "../../profilePicture/UpdateProfilePicture";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { editPersDetails, editProfessionalDetails, updatePersSchema, updateProfessionalSchema } from "./utils";

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
	const [ajouOk, setAjoutOk] = useState(false);
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
	if(ajouOk) {
		doAdd();
    setAjoutOk(false);
	}
}, [ajouOk])

	
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
                    <div
                      className="profile_circle hover1"
                      onClick={() => uploadComp()}
                    >
                      <img src="./images/icons/camera.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>

              <Formik initialValues={item} validationSchema={updatePersSchema}>
                {(props) => (
                  <Form>
                    <div className="fields">
                      {editPersDetails.map((item) => (
                        <div className="input-field">
                          <label>{item.label}</label>
                          {item.type === "select" ? (
                            <Field as="select" name={item.name}>
                              <option value="" disabled selected>
                                {item.placeholder}
                              </option>
                              {item?.options?.map((op) => (
                                <option value={op.key}>{op.value} </option>
                              ))}
                            </Field>
                          ) : item.name === "nombreEnfants" ? (
                            <>
                              <Field
                                type={item.type}
                                placeholder={item.placeholder}
                                name={item.name}
                                options={item.options}
                                validate={item.validate}
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
                                name={item.name}
                                className="error"
                                component="div"
                              />
                            </>
                          ) : (
                            <>
                              <Field
                                type={item.type}
                                placeholder={item.placeholder}
                                name={item.name}
                                options={item.options}
                                validate={item.validate}
                              />
                              <ErrorMessage
                                name={item.name}
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
            </div>
          </div>
          <div className="form second">
            <div className="details address">
              <span className="title">Details Professionels</span>
			  <Formik
                initialValues={item}
                validationSchema={updateProfessionalSchema}
                onSubmit={(values) => {
                  console.log(values);
                }}
                //onChange={handleChange}
              >
                {(props) => (
                  <Form>
                    <div className="fields">
                      {editProfessionalDetails.map((item) => (
                        <div className="input-field">
                          <label>{item.label}</label>
                          {item.type === "select" ? (
                            <>
                              <Field as="select" name={item.name}>
                                <option value="" disabled selected>
                                  {item.placeholder}
                                </option>
                                {item?.options?.map((op) => (
                                  <option value={op.key}>{op.value} </option>
                                ))}
                              </Field>
                              {/*<p>{props.values.isDeclareCnss}</p>*/}
                              <ErrorMessage
                                name={item.name}
                                className="error"
                                component="div"
                              />
                            </>
                          ) : item.type === "text" ||
                            item.type === "date" ||
                            item.type === "number" ? (
                            item.name === "cnss" ||
                            item.name === "nbrPartSociale" ? (
                              <div>
                                <Field
                                  type={item.type}
                                  placeholder={item.placeholder}
                                  disabled={
                                    (item.name === "cnss" &&
                                      props.values.isDeclareCnss != "true") ||
                                    (item.name == "nbrPartSociale" &&
                                      props.values.isAdherent != "true")
                                  }
                                  //onMouseOver={handleSecondInputHover}
                                  name={item.name}
                                  //onChange={props.handleChange}
                                />
                                {isDisabled && (
                                  <span
                                    className="disabled-icon"
                                    title="This field is disabled"
                                  >
                                    🚫
                                  </span>
                                )}
                              </div>
                            ) : item.name === "dda" ? (
                              <>
                                <div>
                                  <Field
                                    type={item.type}
                                    name={item.name}
                                    disabled={props.values.isAdherent != "true"}
                                  />
                                </div>
                              </>
                            ) : (
                              <>
                                <Field
                                  type={item.type}
                                  placeholder={item.placeholder}
                                  name={item.name}
                                  //onChange={props.handleChange}
                                />
                                <ErrorMessage
                                  name={item.name}
                                  className="error"
                                  component="div"
                                />
                              </>
                            )
                          ) : (
                            <>
                              <Field
                                as="textarea"
                                //type={item.type}
                                name={item.name}
                                placeholder={item.placeholder}
                              />
                              <ErrorMessage
                                name={item.name}
                                className="error"
                                component="div"
                              />
                            </>
                          )}
                        </div>
                      ))}
                    </div>

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
