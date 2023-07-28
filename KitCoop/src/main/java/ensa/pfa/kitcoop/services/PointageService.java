package ensa.pfa.kitcoop.services;

import ensa.pfa.kitcoop.models.Personnel;
import ensa.pfa.kitcoop.models.Pointage;
import ensa.pfa.kitcoop.models.UniteProd;
import ensa.pfa.kitcoop.payload.requests.AddPointageRequest;
import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.repositories.PersonnelRepository;
import ensa.pfa.kitcoop.repositories.PointageRepository;
import ensa.pfa.kitcoop.repositories.UniteProdRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PointageService {
    private final UniteProdRepository uniteProdRepository;
    private final PointageRepository pointageRepository;
    private final PersonnelRepository personnelRepository;
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

    public APIResponse updatePointage(Long id, AddPointageRequest pointage){
        Pointage _pointage = pointageRepository.findById(id).get();
        mapPointageToPointageRequest(pointage, _pointage);
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

    public APIResponse insertPointage(AddPointageRequest request) {
        try{
            Pointage pointage = new Pointage();
            mapPointageToPointageRequest(request, pointage);
            Pointage _pointage = pointageRepository.save(pointage);
            return new APIResponse(HttpStatus.OK.value(), _pointage, "Pointage ajouté");
        }catch (Exception e){
            return new APIResponse(HttpStatus.BAD_REQUEST.value(), null, "Error");
        }
    }

    private void mapPointageToPointageRequest(AddPointageRequest request, Pointage pointage) {
        pointage.setNumBordereau(request.getNumBordereau());
        UniteProd uniteProd = uniteProdRepository.findById(request.getCodeUnitProd()).get();
        pointage.setUniteProd(uniteProd);
        //pointage.setCodeUnitProd(request.getCodeUnitProd());
        Personnel personnel = personnelRepository.findByMatricule(request.getMatricule()).get();
        pointage.setPersonnel(personnel);
        pointage.setDateDebut(request.getDateDebut());
        pointage.setDateFin(request.getDateFin());
        pointage.setHeuresNorm(request.getHeuresNorm());
        pointage.setHeuresSup25(request.getHeuresSup25());
        pointage.setHeuresSup50(request.getHeuresSup50());
        pointage.setHeuresSup100(request.getHeuresSup100());
    }
}
