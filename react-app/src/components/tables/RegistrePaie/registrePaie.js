import React from 'react'
import RightArrow from '../../../assets/svg/RightArrow'

const RegistrePaieTable = ({columns, data, handleEdit, handleDelete }) => {
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
							<td>{item?.matricule}</td>
							<td>{item?.nom}</td>
							<td>{item?.prenom}</td>
							<td>{item?.tauxHoraire}</td>
							<td>{item?.dateDebut}</td>
							<td>{item?.dateFin}</td>
							<td>{item?.heuresNorm}</td>
							<td>{item?.heuresSup25}</td>
							<td>{item?.heuresSup50}</td>
							<td>{item?.salaireBase}</td>
							<td>{item?.primeAnciennete}</td>
							<td>{item?.salaireBrut}</td>
                            <td>{item?.retenueCnss}</td>
							<td>{item?.retenueAmo}</td>
                            <td>{item?.retenueIr}</td>
							<td>{item?.avancesEtAutresRetenues}</td>
                            <td>{item?.salaireNet}</td>
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
  )
}

export default RegistrePaieTable