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
						<tr key={item.id}>
							<td>{item.numBordereau}</td>
							<td>{item.uniteProd?.designation}</td>
							{/*<td>{item.uniteProd?.designation} </td>*/}
							<td>{item?.personnel?.matricule}</td>
							<td>{item?.personnel?.nom} </td>
							<td>{item.dateDebut} </td>
							<td>{item.dateFin} </td>
							<td>{item.total}</td>
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