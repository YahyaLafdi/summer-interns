import * as Yup from 'yup';

const situation_familiale = [
    { key: "Marié(e)", value: "Marié(e)" },
    { key: "Célébataire", value: "Célébataire" },
    { key: "Divorcé(e)", value: "Divorcé(e)" },
    { key: "Veuf(ve)", value: "Veuf(ve)" },
];
const sexe = [
    { key: "Féminin", value: "Féminin" },
    { key: "Masculin", value: "Masculin" },
];
const niveau_etudes = [
    { key: "Sans niveau", value: "Sans niveau" },
    { key: "Primaire", value: "Primaire" },
    { key: "Secondaire", value: "Secondaire" },
    { key: "Lycée", value: "Lycée" },
    { key: "Supérieur", value: "Supérieur" },
];

const ouiOuNon = [
    {key: true, value: "Oui"},
    {key: false, value: "Non"}
]
const phoneRegEx = /^((\+\d{1,3})|0?)(\d{9})$/;
const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
const requiredValidation = Yup.string().required("Obligatoire");
const emailValidation = Yup.string().matches(emailRegEx, "Email invalid").required("Obligatoire");
const phoneValidation = Yup.string().required("Obligatoire").matches(phoneRegEx, "Numéro téléphone invalid")
const cinValidation = Yup.string().required("Obligatoire").max(10,"10 caractères au maximum")
const nomValidation = Yup.string().required("Obligatoire").max(30,"30 caractères au maximum");


export const addPersSchema = Yup.object().shape({
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
  });
export const addPersSchema2 = Yup.object().shape({
    niveauEtudes:requiredValidation,
    fonction:requiredValidation,
    dateEmbauche:requiredValidation,
    basePaiement:requiredValidation,
    tauxPaiement:requiredValidation,
    isDeclareCnss:requiredValidation,
    //cnss:requiredValidation,
    isAdherent:requiredValidation,
    dateDepart:requiredValidation,
    //renseignements:requiredValidation,
})


export const personalDetails = [
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
    },
]
const base_de_paiement = [
    { key: "Horaire", value: "Horaire" },
    { key: "Hebdomadaire", value: "Hebdomadaire" },
    { key: "Quinzaine", value: "Quinzaine" },
    { key: "mensuelle", value: "mensuelle" },
];
export const professionalDetails = [
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
        placeholder:"Date de départ",
        label:"Date de départ",
        type:"date",
        name:"dateDepart",
    },
    {
        placeholder:"Renseignements divers",
        label:"Renseignements divers",
        type:"textarea",
        name:"renseignements"
    },
]