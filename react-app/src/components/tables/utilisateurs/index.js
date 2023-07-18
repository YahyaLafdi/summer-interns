import RightArrow from "../../../assets/svg/RightArrow";

export default function UtilisateurTable({ columns, data, handleEdit, handleDelete }) {
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
							<td>{item.username}</td>
							<td>{item.role}</td>
							<td>
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
