import { useEffect, useState } from "react";
import Search from "../../assets/svg/Search";
import "./style.scss";
import Delete from "./Delete";
import GetAddFormForActiveTab from "../../data/GetAddFormForActiveTab";
import GetEditFormForActiveTab from "../../data/GetEditFormForActiveTab";
import axios from "axios";
import PersonnelTable from "../tables/Personnel";
import AdherentTable from "../tables/Adherent";
import FournisseurTable from "../tables/Fournisseur";
import MatiereTable from "../tables/Matiere";
import ClientTable from "../tables/client";
import ProduitTable from "../tables/Produit";
import UtilisateurTable from "../tables/utilisateurs";

export default function Table({
	title,
	data,
	columns,
	setLoading,
	activeTab,
	addVisible,
	refetch,
	setRefetch,
}) {
	// Button animation logic
	useEffect(() => {
		const button = document.querySelector(".button");

		button.addEventListener("mouseover", (e) => {
			button.classList.add("animate");
			setTimeout(() => {
				button.classList.remove("animate");
			}, 600);
		});
	});

	// Search Table mechanism logic
	useEffect(() => {
		const search = document.querySelector(".input-group input"),
			table_rows = document.querySelectorAll("tbody tr");

		search.addEventListener("input", searchTable);
		function searchTable() {
			table_rows.forEach((row, i) => {
				let table_data = row.textContent.toLowerCase(),
					search_data = search.value.toLowerCase();
				row.classList.toggle("hide", table_data.indexOf(search_data) < 0);
				row.style.setProperty("--delay", i / 25 + "s");
			});
			document.querySelectorAll("tbody tr:not(.hide)").forEach((visible_row, i) => {
				visible_row.style.backgroundColor = i % 2 === 0 ? "transparent" : "#0000000b";
			});
		}
	});

	// Sort Table mechanism logic
	useEffect(() => {
		let sort_asc = true;
		const table_headings = document.querySelectorAll("thead th"),
			table_rows = document.querySelectorAll("tbody tr");
		table_headings.forEach((head, i) => {
			head.onclick = () => {
				table_headings.forEach((head) => head.classList.remove("active"));
				head.classList.add("active");

				document.querySelectorAll("td").forEach((td) => td.classList.remove("active"));
				table_rows.forEach((row) => {
					row.querySelectorAll("td")[i].classList.add("active");
				});
				head.classList.toggle("asc", sort_asc);
				sort_asc = head.classList.contains("asc") ? false : true;

				sortTable(i, sort_asc);
			};
		});
		function sortTable(column, sort_asc) {
			[...table_rows]
				.sort((a, b) => {
					let first_row = a.querySelectorAll("td")[column].textContent,
						second_row = b.querySelectorAll("td")[column].textContent;

					// Parse numbers, if applicable
					if (!isNaN(parseFloat(first_row)) && !isNaN(parseFloat(second_row))) {
						first_row = parseFloat(first_row);
						second_row = parseFloat(second_row);
					}

					// Compare values
					return sort_asc ? (first_row < second_row ? 1 : -1) : first_row < second_row ? -1 : 1;
				})
				.map((sorted_row) => document.querySelector("tbody").appendChild(sorted_row));
		}
	}, [data]);

	const [showDelete, setShowDelete] = useState(false);
	const [showAdd, setShowAdd] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [item, setItem] = useState(null);
	const handleDelete = (item) => {
		console.log("delete clicked");
		setShowDelete(true);
		setItem(item);
	};

	const [fournisseurs, setFournisseurs] = useState(null);
	const [matieres, setMatieres] = useState(null);

	const handleAdd = async () => {
		setLoading(true);
		const fournisseursData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/fournisseurs`);
		const matieresData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/matieres`);
		setFournisseurs(fournisseursData);
		setMatieres(matieresData);
		setShowAdd(true);
		setLoading(false);
	};

	const handleEdit = async (itm) => {
		try {
			setLoading(true);
			const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/${activeTab}s/${itm.id}`);
			const fournisseursData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/fournisseurs`);
			const matieresData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/matieres`);
			setMatieres(matieresData);
			setFournisseurs(fournisseursData);
			setItem(data.data);
			setShowEdit(true);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	};
	return (
		<>
			{showDelete && (
				<Delete
					visible={setShowDelete}
					item={item}
					setLoading={setLoading}
					activeTab={activeTab}
					setRefetch={setRefetch}
					refetch={refetch}
				/>
			)}
			{showAdd && (
				<GetAddFormForActiveTab
					visible={setShowAdd}
					activeTab={activeTab}
					setRefetch={setRefetch}
					refetch={refetch}
					setLoading={setLoading}
					additionalDataFournisseurs={fournisseurs}
					additionalDataMatieres={matieres}
				/>
			)}
			{showEdit && (
				<GetEditFormForActiveTab
					visible={setShowEdit}
					activeTab={activeTab}
					setRefetch={setRefetch}
					refetch={refetch}
					setLoading={setLoading}
					item={item}
					additionalDataFournisseurs={fournisseurs}
					additionalDataMatieres={matieres}
				/>
			)}
			<main className="table">
				<section className="table-header">
					<h1>{title}</h1>
					<div className="input-group">
						<input type="search" placeholder="Rechercher..." />
						<Search />
					</div>
					<div className="export__file">
						<label htmlFor="export-file" className="export__file-btn" title="Export File"></label>
						<button className="button" onClick={handleAdd}>
							Ajouter
						</button>
					</div>
				</section>
				<section className="table-body">
					{activeTab === "personnel" && (
						<PersonnelTable
							columns={columns}
							data={data}
							handleEdit={handleEdit}
							handleDelete={handleDelete}
						/>
					)}
					{activeTab === "adherent" && (
						<AdherentTable
							columns={columns}
							data={data}
							handleEdit={handleEdit}
							handleDelete={handleDelete}
						/>
					)}
					{activeTab === "fournisseur" && (
						<FournisseurTable
							columns={columns}
							data={data}
							handleEdit={handleEdit}
							handleDelete={handleDelete}
						/>
					)}
					{activeTab === "matiere" && (
						<MatiereTable columns={columns} data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
					)}
					{activeTab === "client" && (
						<ClientTable columns={columns} data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
					)}
					{activeTab === "produit" && (
						<ProduitTable columns={columns} data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
					)}
					{activeTab === "utilisateur" && (
						<UtilisateurTable
							columns={columns}
							data={data}
							handleEdit={handleEdit}
							handleDelete={handleDelete}
						/>
					)}
					{activeTab === "achat" && (
						<div className="achat-container">
							<div className="products-container">
								{data === undefined && "Vous n'avez effectuer aucune achat. Essayer d'ajouter une."}
								{data &&
									data.map((achat) => {
										return (
											<div className="product" data-name="p-1" key={achat.id}>
												<i className="fa-solid fa-xmark" onClick={() => handleDelete(achat)}></i>
												<img
													className="edit-btn"
													src="./images/icons/edit.png"
													alt=""
													onClick={() => handleEdit(achat)}
												/>
												{/*<img className="product-img" src="images/icons/1.png" alt="" />*/}
												<h3>{achat.nomMatiere}</h3>

												<div className="sign-splitter"></div>

												<div className="line">
													<div className="price">Date : </div>
													<span className="line-value">{achat.dateCommande}</span>
												</div>
												<div className="line">
													<div className="price">Fournisseur :</div>
													<span className="line-value">{achat.nomFournisseur}</span>
												</div>
												<div className="line">
													<div className="price">Quantité : </div>
													<span className="line-value">{achat.quantite}</span>
												</div>
												<div className="line">
													<div className="price">Total : </div>
													<span className="line-value">{achat.total}</span>
												</div>
												<div className="sign-splitter"></div>

												<div className="line">
													<div className="price">Status :</div>
													<span className={`status ${achat.status ? "processed" : "pending"}`}>
														{achat.status ? "Traité" : "En cours"}
													</span>
												</div>
											</div>
										);
									})}
							</div>
						</div>
					)}
				</section>
			</main>
		</>
	);
}
