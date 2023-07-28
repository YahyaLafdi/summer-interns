package ensa.pfa.kitcoop.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.Period;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "REGISTRE_DE_PAIE")
public class RegistrePaie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @OneToOne
    @JoinColumn(name = "pointage_id")
    private Pointage pointage;
    private Double salaireBase;

    public RegistrePaie(Pointage pointage) {
        this.pointage = pointage;
    }
    private Double primeAnciennete;
    private Double salaireBrut;
    private Double retenueCnss;
//    private Double retenueAmo;
    private Double retenueIr;
//    private Double avancesEtAutresRetenues;
    private Double salaireNet;

//    public  RegistrePaie(Pointage p){
//        this.pointage = p;
//    }

    @PrePersist
    @PreUpdate
    public void calculerSalaire(){
        //Salaire de base
        Integer n = this.pointage.getHeuresNorm();
        Integer n25 = this.pointage.getHeuresSup25();
        Integer n50 = this.pointage.getHeuresSup50();
        Integer n100 = this.pointage.getHeuresSup100();
        this.salaireBase = (n + 1.25*n25 + 1.5*n50 + 2*n100)*this.pointage.getPersonnel().getTauxPaiement();

        //Prime d'ancienneté
        Period period = Period.between(this.pointage.getPersonnel().getDateEmbauche(), LocalDate.now());
        Integer mois = period.getYears()*12 + period.getMonths();
        this.primeAnciennete = getPrimeAnciennete(mois);

        //Salaire bruit
        this.salaireBrut = this.salaireBase + this.primeAnciennete;

        //retenur CNSS
        if(this.salaireBrut<=6000.0){
            this.retenueCnss = this.salaireBrut*0.0674;
        }else{
            this.retenueCnss = 6000.0*0.0448 + this.salaireBrut*0.0226;
        }
        //Salaire Brut Imposable : SBI
        Double sbi = this.salaireBrut - this.retenueCnss;

        //Frais professionnels
        Double fraisProfessionnels = Math.min(sbi*0.2, 2500);

        //Salaire Net Imposable : SNI
        Double sni = sbi - fraisProfessionnels;

        //IR brut
        Double irBrut;
        if(sni<=2500){
            irBrut = 0.0;
        } else if (sni > 2500 && sni <= 4166.67) {
            irBrut = sni*0.1 - 250;
        }else if(sni>4167.0 && sni<= 5000){
            irBrut = sni*0.2 - 666.67;
        }else if(sni>5000 && sni<=6666.67){
            irBrut = sni*0.3 - 1166.67;
        }else if(sni>6667 && sni<=15000){
            irBrut = sni*0.34 - 1433.33;
        }else {
            irBrut = sni*0.38 - 2033.33;
        }


        //Charge de famille
        Double chargeFamille;
        if(this.pointage.getPersonnel().getSituationFamiliale() == "Marié(e)"){
            chargeFamille = Math.min(30.0*6,30*(this.pointage.getPersonnel().getNombreEnfants()+1));
        }else if (this.pointage.getPersonnel().getSituationFamiliale() != "Marié(e)" &&
        this.pointage.getPersonnel().getSituationFamiliale() != "Célibataire"){
            chargeFamille = 30.0*this.pointage.getPersonnel().getNombreEnfants();
        }else {
            chargeFamille  = 0.0;
        }

        //IR net
        Double irNet = irBrut - chargeFamille;
        this.retenueIr = irNet;

        //Salaire Net
        this.salaireNet = salaireBrut - retenueCnss - irNet;
    }

    private Double getPrimeAnciennete(Integer mois){
        if(mois<=24){
            return 0.0;
        }else if(mois>24 && mois<=60){
            return 0.05*this.salaireBase;
        }else if(mois>60 && mois<=144){
            return 0.1*this.salaireBase;
        }else if(mois>144 && mois<=240){
            return 0.15*this.salaireBase;
        }else if(mois>240 && mois<=300){
            return 0.2*this.salaireBase;
        }else {
            return 0.25*this.salaireBase;
        }
    }


}
