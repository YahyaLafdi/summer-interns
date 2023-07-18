import { useEffect } from "react";
import RightArrow from "../../../assets/svg/RightArrow";
import Search from "../../../assets/svg/Search";

export default function AdherentTable({ columns, data, handleEdit, handleDelete }) {
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
							<td>
								<img src={item.photoUrl} alt="" />
							</td>
							<td>{item.nom}</td>
							<td>{item.prenom}</td>
							<td>{item.dda}</td>
							<td>{item.ddn}</td>
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
							</td>
						</tr>
					))}
			</tbody>
		</table>
	);
}
