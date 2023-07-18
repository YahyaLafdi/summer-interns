import AddCooperative from "../components/forms/AddCooperative";
import AddAchat from "../components/forms/addAchat";
import AddAdherent from "../components/forms/addAdherent";
import AddClient from "../components/forms/addClient";
import AddFournisseur from "../components/forms/addFournisseur";
import AddMatiere from "../components/forms/addMatiere";
import AddPersonnel from "../components/forms/addPersonnel";
import AddProduit from "../components/forms/addProduit";
import AddUtilisateur from "../components/forms/addUtilisateur";

export default function GetAddFormForActiveTab({
	visible,
	activeTab,
	setLoading,
	refetch,
	setRefetch,
	additionalDataFournisseurs,
	additionalDataMatieres,
}) {
	switch (activeTab) {
		case "personnel":
			return (
				<AddPersonnel
					visible={visible}
					activeTab={activeTab}
					setRefetch={setRefetch}
					refetch={refetch}
					setLoading={setLoading}
				/>
			);
		case "adherent":
			return (
				<AddAdherent
					visible={visible}
					activeTab={activeTab}
					setRefetch={setRefetch}
					refetch={refetch}
					setLoading={setLoading}
				/>
			);
		case "fournisseur":
			return (
				<AddFournisseur
					visible={visible}
					activeTab={activeTab}
					setRefetch={setRefetch}
					refetch={refetch}
					setLoading={setLoading}
				/>
			);
		case "matiere":
			return (
				<AddMatiere
					visible={visible}
					activeTab={activeTab}
					setRefetch={setRefetch}
					refetch={refetch}
					setLoading={setLoading}
					additionalDataFournisseurs={additionalDataFournisseurs}
				/>
			);
		case "client":
			return (
				<AddClient
					visible={visible}
					activeTab={activeTab}
					setRefetch={setRefetch}
					refetch={refetch}
					setLoading={setLoading}
				/>
			);
		case "cooperative":
			return (
				<AddCooperative
					visible={visible}
					activeTab={activeTab}
					setRefetch={setRefetch}
					refetch={refetch}
					setLoading={setLoading}
				/>
			);
		case "produit":
			return (
				<AddProduit
					visible={visible}
					activeTab={activeTab}
					setRefetch={setRefetch}
					refetch={refetch}
					setLoading={setLoading}
				/>
			);
		case "utilisateur":
			return (
				<AddUtilisateur
					visible={visible}
					activeTab={activeTab}
					setRefetch={setRefetch}
					refetch={refetch}
					setLoading={setLoading}
				/>
			);
		case "achat":
			return (
				<AddAchat
					visible={visible}
					activeTab={activeTab}
					setRefetch={setRefetch}
					refetch={refetch}
					setLoading={setLoading}
					additionalDataFournisseurs={additionalDataFournisseurs}
					additionalDataMatieres={additionalDataMatieres}
				/>
			);
		default:
			break;
	}
}
