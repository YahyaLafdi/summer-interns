package ensa.pfa.kitcoop.models;

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
@Table(name = "PRODUITS")
public class Produit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
    private double quantiteStock;

    @Column(name = "INTITULE")
    private String intitule;

    @Column(name = "UNITE_DE_MESURE")
    private String uniteMesure;

    @Column(name = "PRIX_UNITAIRE")
    private Double prixUnitaire;
    @OneToMany(mappedBy = "produit", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CompositionProduit> compositionProducts = new ArrayList<>();


    @Column(name = "SEUIL")
    private Double seuil;

    @Column(name = "LIEU_DE_STOCKAGE")
    private String lieuStockage;

    @OneToMany(mappedBy = "produit", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Matiere> matiersPremiers = new ArrayList<>();
}
