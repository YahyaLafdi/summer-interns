package ensa.pfa.kitcoop.models;

import ensa.pfa.kitcoop.models.enums.CurrentState;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "FOURNISSEURS")
public class Fournisseur {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NOM_FOURNISSEUR")
    private String nom;

    @Column(name = "CATEGORIE_FOURNISSEUR")
    private String categorie;

    @Column(name = "ADRESSE")
    private String adresse;

    @Column(name = "VILLE")
    private String ville;

    @Column(name = "PERSONNE_A_CONTACTER")
    private String nomContact;

    @Column(name = "NUM_GSM")
    private String teleContact;

    @Column(name = "NUM_CIN")
    private String cin;

    @Column(name = "RC")
    private String rc;

    @Column(name = "TAXE_PROFESSIONNELLE")
    private String tp;

    @Column(name = "IF_VALIDE")
    private String if_valid;

    @Column(name = "ICE")
    private String ice;

    @Column(name = "NUM_TELEPHONE")
    private String telephone;

    @Column(name = "NUM_FAX")
    private String fax;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "SITE_WEB")
    private String siteWeb;
    @Column(name = "STATE")
    @Enumerated(EnumType.STRING)
    private CurrentState state;


}
