package ensa.pfa.kitcoop.models;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "POINTAGE")
public class Pointage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
    @Column(name = "NUM_BORDEREAU")
    private String numBordereau;
    /*@Column(name = "CODE_UNIT_PRODUIT")
    private String codeUnitProd;
    @Column(name = "INTITULE_UNIT_PROD")
    private String intituleUnitProd;*/
    @Column(name = "DATE_DEBUT")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateDebut;
    @Column(name = "DATE_FIN")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateFin;
    @Column(name = "HEURES_NORM")
    private Integer heuresNorm;
    @Column(name = "HSUP_25")
    private Integer heuresSup25;
    @Column(name = "HSUP_50")
    private Integer heuresSup50;
    @Column(name = "HSUP_100")
    private Integer heuresSup100;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "0.00")
    @Column(name = "TOTAL")
    private Double total;

    @ManyToOne
    @JoinColumn(name = "PERSONNEL")
    private Personnel personnel;
//    @ManyToOne
//    @JoinColumn(name = "unit_production_id")
//    private UniteProd uniteProd;
    @ManyToOne
    @JoinColumn(name = "UNITE_PROD")
    private UniteProd uniteProd;

    @PrePersist
    @PreUpdate
    public void calculerTotal(){
        this.total = this.heuresNorm + 1.25*this.heuresSup25 + 1.5*this.heuresSup50 + 2*this.heuresSup100;
    }
}
