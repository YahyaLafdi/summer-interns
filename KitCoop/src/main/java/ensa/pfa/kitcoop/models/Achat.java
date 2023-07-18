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
@Table(name = "ACHATS")
public class Achat {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @JoinColumn(name = "NOM_FOURNISSEUR")
        private String nomFournisseur;

        @JoinColumn(name = "ID_MATIERE")
        private Long idMatiere;

        private String nomMatiere;

        @JoinColumn(name = "QUANTITE")
        private Double quantite;

        @Column(name = "PRIX_UNITAIRE")
        private Double prixUnitaire;

        @Column(name = "TVA")
        private Double tva;

        @Column(name = "DATE_COMMANDE")
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate dateCommande;

        @Column(name = "STATUS")
        private boolean status;

        private Double total;


}