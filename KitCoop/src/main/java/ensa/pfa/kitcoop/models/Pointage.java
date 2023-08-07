package ensa.pfa.kitcoop.models;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

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
    @Column(name = "NUM_BORDEREAU", nullable = false)
    private Long id;
    @Column(name = "CODE_UNIT_PRODUIT", nullable = false)
    private Long codeUnitProd;
    @Column(name = "INTITULE_UNIT_PROD", nullable = false)
    private String intituleUnitProd;
    @Column(name = "DATE_DEBUT", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateDebut;
    @Column(name = "DATE_FIN", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateFin;
    @Column(name = "HEURES_NORM", nullable = false)
    private Integer heuresNorm;
    @Column(name = "HSUP_25", nullable = false)
    private Integer heuresSup25;
    @Column(name = "HSUP_50", nullable = false)
    private Integer heuresSup50;
    @Column(name = "HSUP_100", nullable = false)
    private Integer heuresSup100;
    @Column(name = "TOTAL")
    private Double total;

    @ManyToOne
    @JoinColumn(name = "PERSONNEL_ID", nullable = false)
    private Personnel personnel;
    @ManyToOne
    @JoinColumn(name = "UNITE_PROD", nullable = false)
    private UniteProd uniteProd;

    @OneToOne(mappedBy = "pointage", orphanRemoval = true)
    @JsonIgnore
    private RegistrePaie registrePaie;

    @PrePersist
    @PreUpdate
    public void calculValeurs(){
        this.total = this.heuresNorm + 1.25*this.heuresSup25 + 1.5*this.heuresSup50 + 2*this.heuresSup100;
        this.codeUnitProd = this.getUniteProd().getId();
        this.intituleUnitProd = this.getUniteProd().getDesignation();
    }
}
