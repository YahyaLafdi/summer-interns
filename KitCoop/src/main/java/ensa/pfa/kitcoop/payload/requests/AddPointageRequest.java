package ensa.pfa.kitcoop.payload.requests;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class AddPointageRequest {
    private String numBordereau;
    private String codeUnitProd;
    private String matricule;
    private Date dateDebut;
    private Date dateFin;
    private Integer heuresNorm;
    private Integer heuresSup25;
    private Integer heuresSup50;
    private Integer heuresSup100;

}
