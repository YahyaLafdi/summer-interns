export default function GetTitleForActiveTab(activeTab) {
	switch (activeTab) {
		case "personnel":
			return "Gestion personnel";
		case "utilisateur":
			return "Gestion utilisateurs";
		case "client":
			return "Gestion clients";
		case "adherent":
			return "Gestion adhérents";
		case "fournisseur":
			return "Gestion fournisseurs";
		case "matiere":
			return "Gestion matiere et fourniture";
		case "produit":
			return "Gestion produits";
		case "achat":
			return "Vos achats";
		case "pointage":
			return "Pointage des personnels";

		default:
			return [];
	}
}
