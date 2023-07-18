import React from "react";

export default function SimpleOptionInput({ placeholder, options, name, handleChange, itemValue }) {
	if (itemValue === "Masculine ") itemValue = "Masculine";
	return (
		<div className="input-field">
			<label>{placeholder}</label>
			<select name={name} onChange={handleChange} defaultValue={itemValue}>
				<option value="">Selectionner</option>
				{options.map((op) => {
					return (
						<option key={op.key} value={op.key}>
							{op.value}
						</option>
					);
				})}
			</select>
		</div>
	);
}
