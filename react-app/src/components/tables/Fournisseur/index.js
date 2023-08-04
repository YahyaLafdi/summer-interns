import RightArrow from "../../../assets/svg/RightArrow";
import React from "react";

export default function FournisseurTable({ columns, data, handleEdit, handleDelete , handleDisable }) {
	return (
		<table>
			<thead>
				<tr>
					{columns.map((column) => (
						<th key={column.key}>
							{column.title} <RightArrow />
						</th>
					))}
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{data &&
					data.map((item) => (
						<tr key={item.id}>
							<td>{item.nom}</td>
							<td>{item.categorie}</td>
							<td>{item.adresse}</td>
							<td>{item.ville}</td>
							<td>{item.telephone}</td>
							<td>
								{/* edit button */}
								{
									item.state == "ENABLED" && (
										<React.Fragment>
										<img
											className="action-btn"
											src="./images/icons/edit.png"
											alt=""
											onClick={() => handleEdit(item)}
										/>

								{/* delete button */}


									<img
									className="action-btn"
									src="./images/icons/trash-bin.png"
									alt=""
									onClick={() => handleDelete(item)}
							/>


							{/* disable button */}
							<img
								className="action-btn"
								src="./images/icons/exit.png"
								alt=""
								onClick={() => handleDisable(item)}
							/>
											</React.Fragment>
									)
								}
								{item.state == "DISABLED" && (
									<p> Fournisseur Désactivée </p>
								)}

							</td>
						</tr>
					))}
			</tbody>
		</table>
	);
}
