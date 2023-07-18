import React from "react";

export default function SimpleInput({ placeholder, type, name, handleChange, itemValue }) {
	return (
		<div className="input-field">
			<label>{placeholder}</label>
			<input
				type={type}
				placeholder={placeholder}
				name={name}
				onChange={handleChange}
				defaultValue={itemValue}
			/>
		</div>
	);
}
