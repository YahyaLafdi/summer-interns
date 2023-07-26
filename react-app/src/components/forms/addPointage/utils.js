import * as Yup from "yup";
import { nombreValidation, requiredValidation } from "../addPersonnel/utils";

export const pointagesDetails1 = [
    {
        name: "numBordereau",
        label: "N° Bordereau",
        type: "text",
    },
    {
        name: "codeUnitProd",
        label: "Code unité de production",
        type:"text",
    },
   /* {
        name:  "intituleUnitProd",
        label: "Intitulé Unité de production",
        type: "text",
    },*/
    {
        name: "matricule",
        label: "Matricule",
        type: "text"
    },
    {
        name: "dateDebut",
        label: "Date de début",
        type: "date"
    },
    {
        name: "dateFin",
        label: "Date de fin",
        type: "date",
    },
    {
        name: "heuresNorm",
        label: "Heures normales",
        type: "number"
    },
    {
        name: "heuresSup25",
        label: "Heures supplémentaires 25%",
        type: "number"
    },
    {
        name: "heuresSup50",
        label: "Heures supplémentaires 50%",
        type: "number"
    },
    {
        name: "heuresSup100",
        label: "Heures supplémentaires 100%",
        type: "number"
    }
];

export const initPointages = {
    numBordereau: "",
    codeUnitProd: "",
    matricule: "",
    dateDebut:"",
    dateFin:"",
    heuresNorm:0,
    heuresSup25:0,
    heuresSup50:0,
    heuresSup100:0,
    //total:0
}

export const pointageValidation = Yup.object().shape({
    numBordereau: requiredValidation,
    codeUnitProd: requiredValidation,
    matricule: requiredValidation, 
    dateDebut: requiredValidation,
    dateFin:  requiredValidation, 
    heuresNorm: nombreValidation,
    heuresSup25: nombreValidation,
    heuresSup50: nombreValidation,
    heuresSup100: nombreValidation
});