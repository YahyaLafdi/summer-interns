export default function GetColumnsForActiveTab(activeTab) {
	switch (activeTab) {
		case "personnel":
			return [
				{ key: "matricule", title: "Matricule" },
				{ key: "photo", title: "Photo" },
				{ key: "prenom", title: "Prenom" },
				{ key: "nom", title: "Nom" },
				{ key: "ddn", title: "Date de naissance" },
				{ key: "fonction", title: "Fonction" },
				{ key: "cin", title: "CIN" },
			];
		case "pointage":
			return [
				{key: "numBordereau", title: "N° Bordereau"},
				{key: "codeUnitProd", title: "Unité de production"},
				//{key: "intituleUnitProd", title: "Intitulé Unité de production"},
				{key: "matricule", title: "Matricule"},
				/*{key: "nom", title: "Nom"},
				{key: "prenom", title: "Prénom"},*/
				{key: "dateDebut", title: "Date de début"},
				{key: "dateFin", title: "Date de fin"},
				/*{key: "heuresNorm", title: "Heures normales"},
				{key: "heuresSup25", title: "Heures supplémentaires 25%"},
				{key: "heuresSup50", title: "Heures supplémentaires 50%"},
				{key: "heuresSup100", title: "Heures supplémentaires 100%"},*/
				{key: "total", title: "Total"}
			];
		case "utilisateur":
			return [
				{ key: "username", title: "Nom d'utilisateur" },
				{ key: "role", title: "Role" },
			];
		case "adherent":
			return [
				{ key: "photo", title: "Photo" },
				{ key: "nom", title: "Nom" },
				{ key: "prenom", title: "Prénom" },
				{ key: "dda", title: "Date d'adhésion" },
				{ key: "ddn", title: "Date de naissance" },
				{ key: "adresse", title: "Adresse" },
				{ key: "ville", title: "Ville" },
				{ key: "Telephone", title: "Téléphone" },
			];
		case "matiere":
			return [
				{ key: "intitule", title: "Intitulé" },
				{ key: "famille", title: "Famille" },
				{ key: "region", title: "Region Source" },
				{ key: "quantite", title: "Quantité" },
				{ key: "fournisseur", title: "Fournisseur" },
				{ key: "prix", title: "Seuil minimum" },
			];
		case "fournisseur":
			return [
				{ key: "nom", title: "Nom du fournisseur" },
				{ key: "categorie", title: "Catégorie" },
				{ key: "adresse", title: "Adresse" },
				{ key: "ville", title: "Ville" },
				{ key: "telephone", title: "Téléphone" },
			];
		case "client":
			return [
				{ key: "nom", title: "Nom du client" },
				{ key: "adresse", title: "Adresse" },
				{ key: "ville", title: "Ville" },
				{ key: "pays", title: "Pays" },
				{ key: "telephone", title: "Téléphone" },
			];
		case "produit":
			return [
				{ key: "intitule", title: "Intitulé" },
				{ key: "Unite", title: "Unité de mesure" },
				{ key: "prix", title: "Prix unitaire" },
				{ key: "quantite", title: "Quantité en stock" },
				{ key: "seuil", title: "Seuil" },
				{ key: "lieu", title: "Lieu de stockage" },
			];
	
		default:
			return [];
	}
}
