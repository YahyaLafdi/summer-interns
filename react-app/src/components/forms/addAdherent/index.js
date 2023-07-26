import { useCallback, useEffect, useRef, useState } from "react";
import "./../addStyle.scss";
import UpdateProfilePicture from "../../profilePicture/UpdateProfilePicture";
import getCroppedImg from "../../../utils/getCroppedImg";
import SimpleInput from "../../inputs/simpleInput";
import SimpleOptionInput from "../../inputs/simpleOptionInput";
import axios from "axios";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { adherentDetails, adherentDetails2, adherentValidation1, adherentValidation2 } from "./utils";
export const initialValues1 = {
  nom:"",
  prenom:"",
  ddn:"",
  cin:"",
  adresse:"",
  niveauEtudes:"",
  ville:"",
  telephone:"",
  
}
export const initialValues2 = {
  situationFamiliale:"",
  nbrPartSociale:0,
  motif:"",
  ddd:"",
  nombreEnfants:0,
  enfants:[]
}
export default function AddAdherent({ visible, activeTab, setLoading, refetch, setRefetch }) {
	const refInput = useRef(null);
	const [image, setImage] = useState(
		"https://res.cloudinary.com/deqm1j9ey/image/upload/v1680881071/Kitcoop/default_pic_bdegda.png"
	);
	const fields = {
		photoUrl: "",
		nom: "",
		prenom: "",
		ddn: "",
		cin: "",
		telephone: "",
		adresse: "",
		ville: "",
		niveauEtudes: "",
		dda: "",
		ddd: "",
		motif: "",
		nbrPartSociale: "",
		situationFamiliale: "",
		nombreEnfants: 0,
		enfants: []
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

	const [formInfos, setFormInfos] = useState(fields);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormInfos({ ...formInfos, [name]: value });
	};

	useEffect(() => {
		console.log(formInfos);
	});

	const [ajoutOk, setAjoutOk] = useState(false);

	useEffect(() => {
		const doAdd = async () => {
			console.log(formInfos);
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
		if(ajoutOk){
			doAdd()
			setAjoutOk(false);
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

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onload = async function (e) {
			const data = new Uint8Array(e.target.result);
			const workbook = XLSX.read(data, { type: "array" });
			const worksheet = workbook.Sheets[workbook.SheetNames[0]];
			const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

			const fileName = file.name.split(".")[0];
			if (fileName !== "Adherents") {
				alert('Le fichier ne concerne pas les adhérents, vérifier son nom ! Le nom attendu : "Adherents"');
				return;
			}

			const extractedData = jsonData.slice(1).map((row) => ({
				photoUrl:
					"https://res.cloudinary.com/deqm1j9ey/image/upload/v1680881071/Kitcoop/default_pic_bdegda.png",
				nom: row[1],
				prenom: row[2],
				ddn: row[3],
				cin: row[4],
				telephone: row[5],
				adresse: row[6],
				ville: row[7],
				niveauEtudes: row[8],
				dda: row[9],
				ddd: row[10],
				motif: row[11],
				nbrPartSociale: row[12],
				situationFamiliale: row[13],
				nbrEnfant: row[14],
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

	return (
    <div className="blur">
      <div className="container">
        <i className="fa-solid fa-xmark" onClick={() => visible(false)}></i>
        <header>Ajouter un adhérent</header>

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
              <span className="title">Détails Adhérent</span>

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
              <div className="drag-area">
                <span className="uploadHeader">
                  Extraire les donneés á partir d'un fichier Excel
                </span>
                <span>OU</span>
                <Link className="uploadBtn">Parcourir</Link>
                <input
                  hidden
                  type="file"
                  id="fileInput"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                />
              </div>

              <Formik
                initialValues={initialValues1}
                validationSchema={adherentValidation1}
              >
                {(props) => (
                  <Form>
                    <div className="fields">
                      {adherentDetails.map((item) => (
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
							<ErrorMessage
								name={item.name}
								component="div"
								className="error"
							/>
</>
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
                      disabled={!props.isValid || !props.touched.nom}
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
              <span className="title">Détails Adhérent</span>
              <Formik initialValues={initialValues2} validationSchema={adherentValidation2} >
                {(props) => (
                  <Form>
                    <div className="fields">
                      {adherentDetails2.map((item) => (
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
                            <ErrorMessage
                                name={item.name}
                                component="div"
                                className="error"
                            />
                            </>
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
            </div>

            {/*<div className="buttons">
              <div className="backBtn">
                <i className="uil uil-navigator"></i>
                <span className="btnText">précédent</span>
              </div>

              <Link className="backBtn submit" onClick={doAdd}>
                <i className="uil uil-navigator"></i>
                <span className="btnText">Enregistrer</span>
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
