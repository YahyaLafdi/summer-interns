import { useState } from "react";
import { Pdf } from "../../assets/svg/Pdf";
import RightArrow from "../../assets/svg/RightArrow";
import Search from "../../assets/svg/Search";
import { Xls } from "../../assets/svg/Xls";
import ReactPaginate from "react-paginate";

export default function Table() {
	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 3; // Number of items per page
	const pagesVisited = currentPage * itemsPerPage;
	const data = [
		{
			matricule: 1,
			photo: "./images/1231.jpg",
			prenom: "issam",
			nom: "Laoumri",
			ddn: "14/11/2001",
			fonction: "Ingenieur des Systems d'informations",
			cin: "N440000",
		},
		{
			matricule: 2,
			photo: "./images/1231.jpg",
			prenom: "Soufiane",
			nom: "Laoumri",
			ddn: "14/11/2001",
			fonction: "Ingenieur",
			cin: "N440000",
		},
		{
			matricule: 2,
			photo: "./images/1231.jpg",
			prenom: "Ahmed",
			nom: "Ayoub",
			ddn: "14/11/2001",
			fonction: "Technicien",
			cin: "N440000",
		},
		{
			matricule: 3,
			photo: "./images/1231.jpg",
			prenom: "Hiccup",
			nom: "Laoumri",
			ddn: "14/11/2001",
			fonction: "Technicien specialisé",
			cin: "N440000",
		},
		{
			matricule: 4,
			photo: "./images/1231.jpg",
			prenom: "issam",
			nom: "Laoumri",
			ddn: "14/11/2001",
			fonction: "Ingenieur des Systems embarqué",
			cin: "N440000",
		},
	];
	const pageCount = Math.ceil(data.length / itemsPerPage); // Calculate the number of pages
	const changePage = ({ selected }) => {
		setCurrentPage(selected);
	};
	return (
		<main className="table">
			<section className="table-header">
				<h1>Gestion Personnel</h1>
				<div className="input-group">
					<input type="search" placeholder="Rechercher..." />
					<Search />
				</div>
				<div className="export__file">
					<label htmlFor="export-file" className="export__file-btn" title="Export File"></label>
					<div className="export__file-options">
						<label>Exporter en : </label>
						<label htmlFor="export-file" id="toPDF">
							<Pdf />
						</label>
						<label htmlFor="export-file" id="toEXCEL">
							<Xls />
						</label>
					</div>
				</div>
			</section>
			<section className="table-body">
				<table>
					<thead>
						<tr>
							<th>
								Matricule <RightArrow />
							</th>
							<th>
								Photo <RightArrow />
							</th>
							<th>
								Nom <RightArrow />
							</th>
							<th>
								Prenom <RightArrow />
							</th>
							<th>
								Date de naissance <RightArrow />
							</th>
							<th>
								Fonction <RightArrow />
							</th>
							<th>
								CIN <RightArrow />
							</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{data.slice(pagesVisited, pagesVisited + itemsPerPage).map((item) => (
							<tr key={item.id}>
								<td>{item.matricule}</td>
								<td>
									<img src={item.photo} alt="" />
								</td>
								<td>{item.prenom}</td>
								<td>{item.nom}</td>
								<td>{item.ddn}</td>
								<td>{item.fonction}</td>
								<td>{item.cin}</td>
							</tr>
						))}
					</tbody>
				</table>
				<ReactPaginate
					previousLabel={"Previous"}
					nextLabel={"Next"}
					pageCount={pageCount}
					onPageChange={changePage}
					containerClassName={"pagination"}
					previousLinkClassName={"previous-page"}
					nextLinkClassName={"next-page"}
					disabledClassName={"pagination-disabled"}
					activeClassName={"pagination-active"}
				/>
			</section>
		</main>
	);
}
