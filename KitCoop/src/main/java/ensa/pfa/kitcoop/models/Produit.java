package ensa.pfa.kitcoop.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "PRODUITS")
public class Produit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "INTITULE")
    private String intitule;

    @Column(name = "UNITE_DE_MESURE")
    private String uniteMesure;

    @Column(name = "PRIX_UNITAIRE")
    private Double prixUnitaire;



    @Column(name = "SEUIL")
    private Double seuil;

    @Column(name = "LIEU_DE_STOCKAGE")
    private String lieuStockage;

}
