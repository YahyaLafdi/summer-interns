import React from "react";
import ResetForm from "../../components/forms/resetForm";
import ResetHeader from "../../components/headers/ResetHeader";
import Footer from "../../components/footers/footer";

import "./style.scss";

export default function Reset() {
	return (
		<div className="reset">
			<ResetHeader />
			<ResetForm />
			<Footer />
		</div>
	);
}
