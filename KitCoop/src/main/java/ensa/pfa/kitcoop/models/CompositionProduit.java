package ensa.pfa.kitcoop.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompositionProduit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "PRODUIT_ID")
    @JsonIgnore
    private Produit produit;
    @ManyToOne
    @JoinColumn(name = "MATIERE_ID")
    @JsonIgnore
    private Matiere matiere;
    private Double quantite;

}
