package ensa.pfa.kitcoop.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "ETIQUETTE_MATIERE")

public class EtiquetteMatiere {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "MATIERE_ID",insertable=false, updatable=false)
    private Long matiereId;

    @Column(name = "QUANTITE")
    private Double quantite;

    @Column(name = "PRIX_UNITAIRE")
    private Double prixUnitaire;

    @Column(name = "TVA")
    private Double tva;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACHAT_ID", nullable = false)
    private Achat achat;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MATIERE_ID")
    private Matiere matiere;

}
