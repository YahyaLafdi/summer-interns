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
@Table(name = "MATIERES_PREMIERES")
public class Matiere {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;

    @Column(name = "INTITULE")
    private String intitule;

    @Column(name = "FAMILLE")
    private String famille;

    @Column(name = "REGION")
    private String region;

    @Column(name = "QUANTITE")
    private Double quantite;

    @Column(name = "SEUIL_MIN")
    private Double seuil;

    @Column(name = "NOM_FOURNISSEUR")
    private String nomFournisseur;
    @ManyToOne
    @JoinColumn(name = "PRODUIT_ID")
    private Produit produit;
    @OneToMany(mappedBy = "matiere",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CompositionProduit> compositionProducts= new ArrayList<>();



}
