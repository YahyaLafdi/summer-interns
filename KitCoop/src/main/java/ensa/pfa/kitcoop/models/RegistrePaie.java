package ensa.pfa.kitcoop.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.Period;

@Entity
@NoArgsConstructor
@ToString
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
    private String matricule;
    private String nom;
    private String prenom;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private Double tauxHoraire;
    private Integer heuresNorm;
    private Integer heuresSup25;
    private Integer heuresSup50;
    private Integer heuresSup100;
    private Double salaireBase;
    private Double primeAnciennete;
    private Double salaireBrut;
    private Double retenueCnss;
    private Double retenueAmo;
    private Double retenueIr;
    private Double avancesEtAutresRetenues;
    private Double salaireNet;

    public RegistrePaie(Pointage pointage) {
    this.pointage = pointage;
}

    @PrePersist
    @PreUpdate
    public void calculValeurs(){
        this.matricule = this.pointage.getPersonnel().getMatricule();
        this.nom = this.pointage.getPersonnel().getNom();
        this.prenom = this.pointage.getPersonnel().getPrenom();
        this.dateDebut = this.pointage.getDateDebut();
        this.dateFin = this.pointage.getDateFin();
        this.heuresNorm = this.pointage.getHeuresNorm();
        this.heuresSup25 = this.pointage.getHeuresSup25();
        this.heuresSup50 = this.pointage.getHeuresSup50();
        this.tauxHoraire = this.pointage.getPersonnel().getTauxPaiement();
        //Salaire de base
        Integer n = this.pointage.getHeuresNorm();
        Integer n25 = this.pointage.getHeuresSup25();
        Integer n50 = this.pointage.getHeuresSup50();
        Integer n100 = this.pointage.getHeuresSup100();
        this.salaireBase = (n + 1.25*n25 + 1.5*n50 + 2*n100)*this.pointage.getPersonnel().getTauxPaiement();
        if(this.pointage.getPersonnel().getIsDeclareCnss()) {
            //Prime d'ancienneté
            Period period = Period.between(this.pointage.getPersonnel().getDateEmbauche(), LocalDate.now());
            Integer mois = period.getYears() * 12 + period.getMonths();
            this.primeAnciennete = Math.round(getPrimeAnciennete(mois) * 100.0) / 100.0;

            //Salaire bruit
            this.salaireBrut = Math.round((this.salaireBase + this.primeAnciennete) * 100.0) / 100.0;

            //Retenue AMO
            this.retenueAmo = (double) Math.round((this.salaireBrut*0.0226)*100.0)/100.0;

            //retenur CNSS
            this.retenueCnss = Math.min(Math.round((6000.0 * 0.0448 + this.retenueAmo) * 100.0) / 100.0, Math.round(this.salaireBrut * 0.0674 * 100.0) / 100.0);

            //Salaire Brut Imposable : SBI
            Double sbi = this.salaireBrut - this.retenueCnss;

            //Frais professionnels
            Double fraisProfessionnels = Math.min(sbi * 0.2, 2500);

            //Salaire Net Imposable : SNI
            Double sni = sbi - fraisProfessionnels;

            //IR brut
            Double irBrut;
            if (sni <= 2500) {
                irBrut = 0.0;
            } else if (sni > 2500 && sni <= 4166.67) {
                irBrut = sni * 0.1 - 250;
            } else if (sni > 4167.0 && sni <= 5000) {
                irBrut = sni * 0.2 - 666.67;
            } else if (sni > 5000 && sni <= 6666.67) {
                irBrut = sni * 0.3 - 1166.67;
            } else if (sni > 6667 && sni <= 15000) {
                irBrut = sni * 0.34 - 1433.33;
            } else {
                irBrut = sni * 0.38 - 2033.33;
            }


            //Charge de famille
            Double chargeFamille;
            if (this.pointage.getPersonnel().getSituationFamiliale() == "Marié(e)") {
                chargeFamille = Math.min(30.0 * 6, 30 * (this.pointage.getPersonnel().getNombreEnfants() + 1));
            } else if (this.pointage.getPersonnel().getSituationFamiliale() != "Marié(e)" &&
                    this.pointage.getPersonnel().getSituationFamiliale() != "Célibataire") {
                chargeFamille = 30.0 * this.pointage.getPersonnel().getNombreEnfants();
            } else {
                chargeFamille = 0.0;
            }

            //IR net
            Double irNet = irBrut - chargeFamille;
            this.retenueIr = Math.round(irNet * 100.0) / 100.0;

            //Salaire Net
            this.salaireNet = (double) Math.round((salaireBrut - retenueCnss - irNet) * 100.0 / 100.0);
        }
        else{
            this.salaireNet = (double) Math.round(this.salaireBase);
        }
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
