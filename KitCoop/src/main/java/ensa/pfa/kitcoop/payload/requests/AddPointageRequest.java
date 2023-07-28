package ensa.pfa.kitcoop.payload.requests;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class AddPointageRequest {
    private String numBordereau;
    private Long codeUnitProd;
    private String matricule;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private Integer heuresNorm;
    private Integer heuresSup25;
    private Integer heuresSup50;
    private Integer heuresSup100;

}
