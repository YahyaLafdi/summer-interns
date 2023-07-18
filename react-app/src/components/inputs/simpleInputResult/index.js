import React from "react";

export default function SimpleInputResult({ placeholder, type, name, handleChange, itemValue, isReadOnly }) {
	return (
		<div className="input-field">
			<label>{placeholder}</label>
			<input
				style={{
					cursor: "auto",
					background: isReadOnly ? "transparent" : "#C0C0C0",
					color: isReadOnly ? "black" : "black",
				}}
				defaultValue={itemValue}
				readOnly={!isReadOnly ? "readOnly" : null}
				name={name}
				type={type}
				onChange={handleChange}
			/>
		</div>
	);
}
