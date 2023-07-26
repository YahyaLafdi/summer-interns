import { useEffect } from "react";
import RightArrow from "../../../assets/svg/RightArrow";
import Search from "../../../assets/svg/Search";

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
							</td>
						</tr>
					))}
			</tbody>
		</table>
	);
}
