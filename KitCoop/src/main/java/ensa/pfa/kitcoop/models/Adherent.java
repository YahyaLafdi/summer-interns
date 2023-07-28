package ensa.pfa.kitcoop.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "ADHERENT")
public class Adherent {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;

    @Column(name = "PHOTO")
    private String photoUrl;

    @Column(name = "NOM")
    private String nom;

    @Column(name = "PRENOM")
    private String prenom;

    @Column(name = "DATE_NAISSANCE")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate ddn;

    @Column(name = "CIN")
    private String cin;

    @Column(name = "TELEPHONE")
    private String telephone;

    @Column(name = "ADRESSE")
    private String adresse;

    @Column(name = "VILLE")
    private String ville;

    @Column(name = "NIVEAU_ETUDES")
    private String niveauEtudes;

    @Column(name = "ADHESION_DATE")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dda;

    @Column(name = "Date_DEPART")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate ddd;

    @Column(name = "MOTIF")
    private String motif;

    @Column(name = "NB_PARTS_SOCIALES")
    private int nbrPartSociale;

    @Column(name = "SITUATION_FAMILIALE")
    private String situationFamiliale;

    @Column(name = "NB_ENFANTS")
    private int nbrEnfant;
}
