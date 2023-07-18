import RightArrow from "../../../assets/svg/RightArrow";

export default function MatiereTable({ columns, data, handleEdit, handleDelete }) {
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
							<td>{item.intitule}</td>
							<td>{item.famille}</td>
							<td>{item.region}</td>
							<td>{item.quantite}</td>
							<td>{item.nomFournisseur}</td>
							<td>{item.seuil}</td>
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
