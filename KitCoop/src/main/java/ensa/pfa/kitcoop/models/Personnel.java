package ensa.pfa.kitcoop.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import ensa.pfa.kitcoop.models.enums.BasePaiement;
import ensa.pfa.kitcoop.models.enums.NiveauEtudes;
import ensa.pfa.kitcoop.models.enums.Sexe;
import ensa.pfa.kitcoop.models.enums.SituationFamiliale;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "PERSONNEL")
public class Personnel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;

    @Column(name = "MATRICULE", unique = true)
    private String matricule;

    @Column(name = "ADHERENT")
    private Boolean isAdherent;

    @Column(name = "NOM")
    private String nom;

    @Column(name = "PRENOM")
    private String prenom;

    //@Enumerated(EnumType.STRING)
    @Column(name = "NIVEAU_ETUDES")
    private String niveauEtudes;

    //@Enumerated(EnumType.STRING)
    @Column(name = "SEXE")
    private String sexe;

    @Column(name = "PHOTO")
    private String photoUrl;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "LocalDate_NAISSANCE")
    private LocalDate ddn;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "ADHESION_LocalDate")
    private LocalDate dda;

    @Column(name = "MOTIF")
    private String motif;

    @Column(name = "NB_PARTS_SOCIALES")
    private int nbrPartSociale;


    @Column(name = "FONCTION")
    private String fonction;

    @Column(name = "CIN")
    private String cin;

    @Column(name = "CNSS")
    private String cnss;

    @Column(name = "ADRESSE")
    private String adresse;

    @Column(name = "VILLE")
    private String ville;

    @Column(name = "LocalDate_EMBAUCHE")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateEmbauche;

    //@Enumerated(EnumType.STRING)
    @Column(name = "BASE_PAIEMENT")
    private String basePaiement;

    @Column(name = "TAUX_PAIEMENT")
    private Double tauxPaiement;

    @Column(name = "DECLARE_CNSS")
    private Boolean isDeclareCnss;

    @Column(name = "TELEPHONE")
    private String telephone;

    @Column(name = "SITUATION_FAMILIALE")
    private String situationFamiliale;

    @Column(name = "NOMBRE_ENFANTS")
    private Integer nombreEnfants;

    @Column(name = "LocalDate_DEPART")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateDepart;

    @Column(name = "RENSEIGNEMENTS_DIVERS")
    private String renseignements;


    @OneToMany(mappedBy = "parent",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    //@JsonIgnore
    @JsonManagedReference
    private List<Enfant> enfants;
}
