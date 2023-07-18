import { useState } from "react";
import "./../addStyle.scss";
import SimpleInput from "../../inputs/simpleInput";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function AddCooperative({ visible, activeTab, setLoading, refetch, setRefetch }) {
	const fields = {
		nom: "",
		adresse: "",
		ville: "",
		activite: "",
		president: "",
		directeur: "",
		dateCreation: "",
		capitaleSociale: 0,

		numAgrement: "",
		telephone: "",
		fax: "",
		email: "",
		siteWeb: "",
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

	useEffect(() => {
		const form = document.querySelector("form"),
			nextBtn = form.querySelector(".nextBtn"),
			backBtn = form.querySelector(".backBtn");
		nextBtn.addEventListener("click", () => {
			form.classList.add("secActive");
		});

		backBtn.addEventListener("click", () => form.classList.remove("secActive"));
	});

	const doAdd = async () => {
		try {
			setLoading(true);
			await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/cooperatives`, formInfos);
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
				<header>Ajouter les informations de votre coopérative</header>

				<form action="#">
					<div className="form first">
						<div className="details personal">
							<span className="title">Détails de la coopérative</span>

							<div className="fields">
								<SimpleInput
									placeholder="Nom de la coopérative"
									type="text"
									name="nom"
									handleChange={handleChange}
								/>
								<SimpleInput placeholder="Adresse" type="text" name="adresse" handleChange={handleChange} />
								<SimpleInput placeholder="Ville" type="text" name="ville" handleChange={handleChange} />
								<SimpleInput placeholder="Activité" type="text" name="activite" handleChange={handleChange} />
								<SimpleInput
									placeholder="President"
									type="text"
									name="president"
									handleChange={handleChange}
								/>
								<SimpleInput
									placeholder="Directeur"
									type="text"
									name="directeur"
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
							<span className="title">Détails de la coopérative</span>

							<div className="fields">
								<SimpleInput
									placeholder="Date de création"
									type="date"
									name="dateCreation"
									handleChange={handleChange}
								/>
								<SimpleInput
									placeholder="Capitale sociale"
									type="number"
									name="capitaleSociale"
									handleChange={handleChange}
								/>
								<SimpleInput
									placeholder="Numéro d'immatriculation"
									type="text"
									name="numAgrement"
									handleChange={handleChange}
								/>
								<SimpleInput
									placeholder="Téléphone"
									type="text"
									name="telephone"
									handleChange={handleChange}
								/>
								<SimpleInput placeholder="FAX" type="text" name="fax" handleChange={handleChange} />
								<SimpleInput placeholder="Email" type="text" name="email" handleChange={handleChange} />
								<SimpleInput placeholder="Site web" type="text" name="siteWeb" handleChange={handleChange} />
							</div>
						</div>
						<div className="backBtn">
							<i className="uil uil-navigator"></i>
							<span className="btnText">précédent</span>
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
