import EditAchat from "../components/forms/editAchat";
import EditAdherent from "../components/forms/editAdherent";
import EditClient from "../components/forms/editClient";
import EditFournisseur from "../components/forms/editFournisseur";
import EditMatiere from "../components/forms/editMatiere";
import EditPersonnel from "../components/forms/editPersonnel";
import EditPointage from "../components/forms/editPointage/editPointage";
import EditProduit from "../components/forms/editProduit";

export default function GetEditFormForActiveTab({
	visible,
	activeTab,
	setLoading,
	refetch,
	setRefetch,
	item,
	additionalDataFournisseurs,
	additionalDataMatieres,
}) {
	switch (activeTab) {
		case "personnel":
			return (
				<EditPersonnel
					visible={visible}
					activeTab={activeTab}
					setRefetch={setRefetch}
					refetch={refetch}
					setLoading={setLoading}
					item={item}
				/>
			);
		case "adherent":
			return (
				<EditAdherent
					visible={visible}
					activeTab={activeTab}
					setRefetch={setRefetch}
					refetch={refetch}
					setLoading={setLoading}
					item={item}
				/>
			);
		case "pointage":
			return (
				<EditPointage
					visible={visible}
					activeTab={activeTab}
					setRefetch={setRefetch}
					refetch={refetch}
					setLoading={setLoading}
					item={item}
				/>
			)
		case "paie":
			return (
				<></>
			)
		case "fournisseur":
			return (
				<EditFournisseur
					visible={visible}
					activeTab={activeTab}
					setRefetch={setRefetch}
					refetch={refetch}
					setLoading={setLoading}
					item={item}
				/>
			);

		case "matiere":
			return (
				<EditMatiere
					visible={visible}
					activeTab={activeTab}
					setRefetch={setRefetch}
					refetch={refetch}
					setLoading={setLoading}
					item={item}
					additionalDataFournisseurs={additionalDataFournisseurs}
				/>
			);
			case "Composition":
			return (
				<EditMatiere
					visible={visible}
					activeTab={activeTab}
					setRefetch={setRefetch}
					refetch={refetch}
					setLoading={setLoading}
					item={item}
					additionalDataFournisseurs={additionalDataFournisseurs}
				/>
			);
		case "client":
			return (
				<EditClient
					visible={visible}
					activeTab={activeTab}
					setRefetch={setRefetch}
					refetch={refetch}
					setLoading={setLoading}
					item={item}
				/>
			);
		case "produit":
			return (
				<EditProduit
					visible={visible}
					activeTab={activeTab}
					setRefetch={setRefetch}
					refetch={refetch}
					setLoading={setLoading}
					item={item}
				/>
			);
		case "achat":
			return (
				<EditAchat
					visible={visible}
					activeTab={activeTab}
					setRefetch={setRefetch}
					refetch={refetch}
					setLoading={setLoading}
					item={item}
					additionalDataFournisseurs={additionalDataFournisseurs}
					additionalDataMatieres={additionalDataMatieres}
				/>
			);

		default:
			break;
	}
	if (activeTab === "personnel") {
	} else if (activeTab === "utilisateurs") {
		return <div>Modifier Utilisateurs</div>;
	}
}
