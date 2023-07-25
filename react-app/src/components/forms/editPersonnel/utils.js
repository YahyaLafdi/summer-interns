import * as Yup from "yup";
import { base_de_paiement, cinValidation, niveau_etudes, nomValidation, ouiOuNon, phoneValidation, requiredValidation, sexe, situation_familiale } from "../addPersonnel/utils";


export const updatePersSchema = Yup.object().shape({
    matricule: requiredValidation,
    nom: nomValidation,
    prenom: nomValidation,    
    cin: cinValidation,
    sexe: requiredValidation,
    situationFamiliale: requiredValidation,
    //adresse:requiredValidation,
    ville:requiredValidation,
    ddn:requiredValidation,
    telephone: phoneValidation,
    //nombreEnfants:requiredValidation
})
export const updateProfessionalSchema = Yup.object().shape({
    niveauEtudes:requiredValidation,
    fonction:requiredValidation,
    dateEmbauche:requiredValidation,
    basePaiement:requiredValidation,
    tauxPaiement:requiredValidation,
    isDeclareCnss:requiredValidation,
    //cnss:requiredValidation,
    isAdherent:requiredValidation,
    //dateDepart:requiredValidation,
    //renseignements:requiredValidation,
})

export const editPersDetails = [
    {
        placeholder:"Matricule",
        label:"Matricule",
        type:"text",
        name:"matricule",
    },
    {
        placeholder:"Nom",
        label:"Nom",
        type:"text",
        name:"nom",
    },
    {
        placeholder:"Prénom",
        label:"Prénom",
        type:"text",
        name:"prenom",
    },
    {
        placeholder:"Sexe",
        label:"Sexe",
        type:"select",
        name:"sexe",
        options: sexe
    },
    {
        placeholder:"Selectionner",
        label:"Situation Familiale",
        type:"select",
        name:"situationFamiliale",
        options:situation_familiale
    },
    {
        placeholder:"CIN",
        label:"CIN",
        type:"text",
        name:"cin"
    },
    {
        placeholder:"Adresse",
        label:"Adresse",
        type:"text",
        name:"adresse"
    },
    {
        placeholder:"Ville",
        label:"Ville",
        type:"text",
        name:"ville"
    },
    {
        //placeholder:"Date de naissance",
        label:"Date de naissance",
        type:"date",
        name:"ddn"
    },
    {
        placeholder:"Téléphone",
        label:"Téléphone",
        type:"text",
        name:"telephone"
    },
    {
        placeholder:"Nombre d'enfants",
        label:"Nombre d'enfants",
        type:"number",
        name:"nombreEnfants"
    }
]

export const editProfessionalDetails = [
    {
        placeholder: "Niveau d'études",
        label: "Niveau d'étude",
        type: "select",
        options: niveau_etudes,
        name:"niveauEtudes"
    },
    {
        placeholder:"Fonction",
        label:"Fonction",
        type:"text",
        name:"fonction"
    },
    {
        //placeholder:"Nombre d'enfants",
        label:"Date d'embauche",
        type:"date",
        name:"dateEmbauche"
    },
    {
        placeholder:"Base de paiement",
        label:"Base de paiement",
        type:"select",
        name:"basePaiement",
        options: base_de_paiement
    },
    {
        placeholder:"Taux de paiement",
        label:"Taux de paiement",
        type:"text",
        name:"tauxPaiement"
    },
    {
        placeholder:"Déclaré(e) à la CNSS",
        label:"Déclaré(e) à la CNSS",
        type:"select",
        name:"isDeclareCnss",
        options:ouiOuNon
    },
    {
        placeholder:"Numéro CNSS",
        label:"Numéro CNSS",
        type:"text",
        name:"cnss"
    },
    {
        placeholder:"Adhérent",
        label:"Adhérent",
        type:"select",
        name:"isAdherent",
        options:ouiOuNon
    },
    {
        placeholder: "Nombre de parts sociales",
        label: "Nombres de parts sociales",
        type: "number",
        name: "nbrPartSociale"
    },
    {
        placeholder: "Date d'adhésion",
        label: "Date d'adhésion",
        type: "date",
        name: "dda"
    },
    {
        placeholder:"Date de départ",
        label:"Date de départ",
        type:"date",
        name:"dateDepart",
    },
    {
        placeholder: "Motif de départ",
        label:"Motif de départ",
        type: "text",
        name: "motif"
    },
    {
        placeholder:"Renseignements divers",
        label:"Renseignements divers",
        type:"textarea",
        name:"renseignements"
    },
]