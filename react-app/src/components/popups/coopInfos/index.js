import { Link } from "react-router-dom";
import SimpleInputResult from "../../inputs/simpleInputResult";
import { useState } from "react";
import axios from "axios";

export default function CoopInfos({ isAdmin, visible, data, activeTab, setLoading, refetch, setRefetch }) {
	const coop = data.data.data[0];
	const fields = {
		nom: coop.nom,
		adresse: coop.adresse,
		ville: coop.ville,
		activite: coop.activite,
		president: coop.president,
		directeur: coop.directeur,
		dateCreation: coop.dateCreation,
		capitaleSociale: coop.capitaleSociale,
		numAgrement: coop.numAgrement,
		telephone: coop.telephone,
		fax: coop.fax,
		email: coop.email,
		siteWeb: coop.siteWeb,
	};

	//=============================================================

	//=============================================================

	//=============================================================

	//=============================================================
	const [isReadOnly, setIsReadOnly] = useState(false);
	const [formInfos, setFormInfos] = useState(fields);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormInfos({ ...formInfos, [name]: value });
	};
	const doAdd = async () => {
		try {
			setLoading(true);
			await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/cooperatives/${coop.id}`, formInfos);
			setLoading(false);
			visible(false);
			setRefetch(!refetch);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	console.log(formInfos);
	return (
		<div className="blur">
			<div className="container">
				<i className="fa-solid fa-xmark" onClick={() => visible(false)}></i>
				<header>Les informations de la coopérative</header>
				{isAdmin && (
					<Link className="editBtn" onClick={() => setIsReadOnly(!isReadOnly)}>
						<img src="./images/icons/edit.png" alt="" />
					</Link>
				)}

				<form action="#">
					<div className="form first">
						<div className="details personal">
							<span className="title">Détails de la coopérative</span>

							<div className="fields">
								<SimpleInputResult
									placeholder="Nom de la coopérative"
									itemValue={coop.nom}
									type="text"
									name="nom"
									isReadOnly={isReadOnly}
									handleChange={handleChange}
								/>
								<SimpleInputResult
									placeholder="Adresse"
									itemValue={coop.adresse}
									isReadOnly={isReadOnly}
									type="text"
									name="adresse"
									handleChange={handleChange}
								/>
								<SimpleInputResult
									placeholder="Ville"
									itemValue={coop.ville}
									type="text"
									name="ville"
									isReadOnly={isReadOnly}
									handleChange={handleChange}
								/>
								<SimpleInputResult
									placeholder="Activité"
									itemValue={coop.activite}
									type="text"
									name="activite"
									isReadOnly={isReadOnly}
									handleChange={handleChange}
								/>
								<SimpleInputResult
									placeholder="President"
									itemValue={coop.president}
									type="text"
									name="president"
									isReadOnly={isReadOnly}
									handleChange={handleChange}
								/>
								<SimpleInputResult
									placeholder="Directeur"
									itemValue={coop.directeur}
									type="text"
									name="directeur"
									isReadOnly={isReadOnly}
									handleChange={handleChange}
								/>
								<SimpleInputResult
									placeholder="Date de création"
									itemValue={coop.dateCreation}
									type="text"
									name="dateCreation"
									isReadOnly={isReadOnly}
									handleChange={handleChange}
								/>
								<SimpleInputResult
									placeholder="Capitale sociale"
									itemValue={coop.capitaleSociale}
									type="number"
									name="capitaleSociale"
									isReadOnly={isReadOnly}
									handleChange={handleChange}
								/>
								<SimpleInputResult
									placeholder="Numéro d'immatriculation"
									itemValue={coop.numAgrement}
									type="text"
									name="numAgrement"
									isReadOnly={isReadOnly}
									handleChange={handleChange}
								/>
								<SimpleInputResult
									placeholder="Téléphone"
									itemValue={coop.telephone}
									type="text"
									name="telephone"
									isReadOnly={isReadOnly}
									handleChange={handleChange}
								/>
								<SimpleInputResult
									placeholder="FAX"
									itemValue={coop.fax}
									type="text"
									name="fax"
									isReadOnly={isReadOnly}
									handleChange={handleChange}
								/>
								<SimpleInputResult
									placeholder="Email"
									itemValue={coop.email}
									type="text"
									name="email"
									isReadOnly={isReadOnly}
									handleChange={handleChange}
								/>
								<SimpleInputResult
									placeholder="Site web"
									itemValue={coop.siteWeb}
									type="text"
									name="siteWeb"
									isReadOnly={isReadOnly}
									handleChange={handleChange}
								/>
							</div>
						</div>
						{isReadOnly && (
							<Link className="backBtn submit" onClick={doAdd}>
								<span className="btnText">Enregistrer</span>
								<i className="uil uil-navigator"></i>
							</Link>
						)}
					</div>
					<div className="form second">
						<div className="details address">
							<span className="title">Détails de la coopérative</span>

							<div className="fields"></div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
