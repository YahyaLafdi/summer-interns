import React, { useEffect } from 'react'
import RightArrow from '../../../assets/svg/RightArrow';

const PointageTable = ({columns, data, handleEdit, handleDelete }) => {
    
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
					data?.map((item) => (
						<tr key={item?.id}>
							<td>{item?.id}</td>
							<td>{item?.codeUnitProd}</td>
							<td>{item?.intituleUnitProd}</td>
							<td>{item?.personnel?.matricule}</td>
							<td>{item?.personnel?.nom}</td>
							<td>{item?.personnel?.prenom}</td>
							<td>{item?.dateDebut}</td>
							<td>{item?.dateFin}</td>
							<td>{item?.heuresNorm}</td>
							<td>{item?.heuresSup25}</td>
							<td>{item?.heuresSup50}</td>
							<td>{item?.heuresSup100}</td>
							<td>{item?.total}</td>
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

export default PointageTable