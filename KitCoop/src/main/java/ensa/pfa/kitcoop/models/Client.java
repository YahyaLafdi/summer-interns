package ensa.pfa.kitcoop.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "CLIENTS")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NOM_CLIENT")
    private String nom;

    @Column(name = "PAYS")
    private String pays;

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
}
