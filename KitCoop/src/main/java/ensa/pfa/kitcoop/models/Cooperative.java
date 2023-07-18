package ensa.pfa.kitcoop.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "COOPERATIVE")
public class Cooperative {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NOM")
    private String nom;

    @Column(name = "ADRESSE")
    private String adresse;

    @Column(name = "VILLE")
    private String ville;

    @Column(name = "ACTIVITE")
    private String activite;

    @Column(name = "PRESIDENT")
    private String president;

    @Column(name = "DIRECTEUR")
    private String directeur;

    @Column(name = "DATE_CREATION")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateCreation;

    @Column(name = "CAPITAL_SOCIAL")
    private Double capitaleSociale;

    @Column(name = "NB_ADHERENTS")
    private int nombreAdherent;

    @Column(name = "NB_EMPLOYES")
    private int nombrePersonnel;

    @Column(name = "AGREEMENT")
    private String numAgrement;

    @Column(name = "TELEPHONE")
    private String telephone;

    @Column(name = "FAX")
    private String fax;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "SITE_WEB")
    private String siteWeb;
}
