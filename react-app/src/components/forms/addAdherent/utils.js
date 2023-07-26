import * as Yup from "yup";
import { cinValidation, niveau_etudes, nomValidation, nombreValidation, phoneValidation, requiredValidation, situation_familiale } from "../addPersonnel/utils";

export const pastDateValidation = Yup.date().max(new Date(), "date invalide");
export const pastReqDateValidation = Yup.date().required("Obligatoire").max(new Date(), "date invalide");

export const adherentValidation1 = Yup.object().shape({
    nom: nomValidation,
    prenom: nomValidation,    
    cin: cinValidation,
    //situationFamiliale: requiredValidation,
    //adresse:requiredValidation,
    ville:requiredValidation,
    ddn:pastDateValidation,
    telephone: phoneValidation,
    dda: pastReqDateValidation,
    niveauEtudes:requiredValidation,
    
})
export const adherentValidation2 = Yup.object().shape({
    //ddd:requiredValidation,
    //motif:requiredValidation,
    
    //fonction:requiredValidation,
   //dateEmbauche:requiredValidation,
    //basePaiement:requiredValidation,
   // tauxPaiement:requiredValidation,
    //isDeclareCnss:requiredValidation,
    nombreEnfants: nombreValidation,
    //cnss:requiredValidation,
    //isAdherent:requiredValidation,
    ddd:pastDateValidation,
    //renseignements:requiredValidation,
})
export const adherentDetails = [
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
        //placeholder:"Date de naissance",
        label:"Date de naissance",
        type:"date",
        name:"ddn"
    },
    {
        placeholder:"CIN",
        label:"CIN",
        type:"text",
        name:"cin"
    },
    {
        placeholder:"Téléphone",
        label:"Téléphone",
        type:"text",
        name:"telephone"
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
        placeholder: "Niveau d'études",
        label: "Niveau d'étude",
        type: "select",
        options: niveau_etudes,
        name:"niveauEtudes"
    },
    {
        placeholder: "Date d'adhésion",
        label: "Date d'adhésion",
        type: "date",
        name: "dda"
    },
]

export const adherentDetails2 = [
    {
        placeholder:"Date de départ",
        label:"Date de départ",
        type:"date",
        name:"ddd",
    },
    {
        placeholder: "Motif de départ",
        label:"Motif de départ",
        type: "text",
        name: "motif"
    },
    {
        placeholder: "Nombre de parts sociales",
        label: "Nombres de parts sociales",
        type: "number",
        name: "nbrPartSociale"
    },
    {
        placeholder:"Selectionner",
        label:"Situation Familiale",
        type:"select",
        name:"situationFamiliale",
        options:situation_familiale
    },
    {
        placeholder:"Nombre d'enfants",
        label:"Nombre d'enfants",
        type:"number",
        name:"nombreEnfants"
    },
]