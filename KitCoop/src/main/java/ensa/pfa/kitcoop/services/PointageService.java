package ensa.pfa.kitcoop.services;

import ensa.pfa.kitcoop.models.Pointage;
import ensa.pfa.kitcoop.models.UniteProd;
import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.repositories.PointageRepository;
import ensa.pfa.kitcoop.repositories.UniteProdRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PointageService {
    private final UniteProdRepository uniteProdRepository;
    private final PointageRepository pointageRepository;
    public APIResponse getAllPointages() {
        try{
            List<Pointage> pointages = pointageRepository.findAll();
            if(pointages.isEmpty()){
                return new APIResponse(HttpStatus.NO_CONTENT.value(), null, "Pas de pointage. Essayer d'en ajouter un.");
            }
            return new APIResponse(HttpStatus.OK.value(), pointages, "OK.");
        }catch(Exception e){
            return new APIResponse(HttpStatus.BAD_REQUEST.value(), null, "Error.");
        }

    }

    public APIResponse getPointageById(Long id){
        Optional<Pointage> pointageData = pointageRepository.findById(id);
        if(pointageData.isPresent()){
            return new APIResponse(HttpStatus.OK.value(), pointageData.get(), "Pointage trouvé");
        }else{
            return new APIResponse(HttpStatus.NOT_FOUND.value(), null, "pointage non trouvé");
        }
    }

    public APIResponse updatePointage(Long id, Pointage pointage){
        Pointage _pointage = pointageRepository.findById(id).get();
        _pointage.setNumBordereau(pointage.getNumBordereau());
        _pointage.setCodeUnitProd(pointage.getCodeUnitProd());
        _pointage.setIntituleUnitProd(pointage.getIntituleUnitProd());
        _pointage.setNom(pointage.getNom());
        _pointage.setPrenom(pointage.getPrenom());
        _pointage.setMatricule(pointage.getMatricule());
        _pointage.setDateFin(pointage.getDateFin());
        _pointage.setHeuresNorm(pointage.getHeuresNorm());
        _pointage.setDateDebut(pointage.getDateDebut());
        _pointage.setHeuresSup25(pointage.getHeuresSup25());
        _pointage.setHeuresSup50(pointage.getHeuresSup50());
        _pointage.setHeuresSup100(pointage.getHeuresSup100());
        Pointage pointage1 = pointageRepository.save(_pointage);
        return new APIResponse(HttpStatus.OK.value(), pointage1, "modification effectuée");
    }

    public APIResponse deletePointage(Long id){
        try{
            pointageRepository.deleteById(id);
            return new APIResponse(HttpStatus.OK.value(), null, "Suppression effectuée");
        }catch (Exception e){
            return new APIResponse(HttpStatus.BAD_REQUEST.value(), null, "Erreur de suppression");
        }
    }

    public APIResponse insertPointage(Pointage pointage) {
        try{
            Pointage p = pointageRepository.save(pointage);
            return new APIResponse(HttpStatus.OK.value(), pointage, "Pointage ajouté");
        }catch (Exception e){
            return new APIResponse(HttpStatus.BAD_REQUEST.value(), null, "Error");
        }
    }
}
