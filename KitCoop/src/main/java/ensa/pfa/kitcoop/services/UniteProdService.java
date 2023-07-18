package ensa.pfa.kitcoop.services;

import ensa.pfa.kitcoop.exception.InternalErrorException;
import ensa.pfa.kitcoop.models.UniteProd;
import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.repositories.UniteProdRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UniteProdService {
    private final UniteProdRepository uniteProdRepository;

    @Autowired
    public UniteProdService(UniteProdRepository uniteProdRepository){
        this.uniteProdRepository = uniteProdRepository;
    }

    public APIResponse createUniteProd(UniteProd uniteProd){
        try {
            UniteProd newUnitProd = new UniteProd();
            UnitProdOpr(uniteProd, newUnitProd);
            UniteProd savedUnitProd = uniteProdRepository.save(newUnitProd);
            return new APIResponse(HttpStatus.CREATED.value(), savedUnitProd, "Ajouter avec success");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }

    public APIResponse getUnitProdById(Long id){
        Optional<UniteProd> unitProdData = uniteProdRepository.findById(id);
        if(unitProdData.isPresent()){
            return new APIResponse(HttpStatus.OK.value(), unitProdData.get(), "Une unité de production est trouvée.");
        }
        else {
            return new APIResponse(HttpStatus.NOT_FOUND.value(), null, "L'unité de production' est untrouvable.");
        }
    }

    public APIResponse getAllUnitProd(){
        try {
            List<UniteProd> uniteProds = new ArrayList<UniteProd>();
            uniteProdRepository.findAll().forEach(uniteProds::add);
            if(uniteProds.isEmpty()){
                return new APIResponse(HttpStatus.NO_CONTENT.value(), null, "Aucune unité de production n'est trouvée. Essayer d'en ajouter un.");
            }
            return new APIResponse(HttpStatus.OK.value(), uniteProds, "OK.");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }

    public APIResponse deleteUnitProds(Long id){
        try {
            uniteProdRepository.deleteById(id);
            return new APIResponse(HttpStatus.NO_CONTENT.value(), null, "Supprimer avec succes.");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }

    public APIResponse updateUnitProd(Long id, UniteProd uniteProd){
        Optional<UniteProd> unitProdData = uniteProdRepository.findById(id);
        if(unitProdData.isPresent()){
            UniteProd _unitProd = unitProdData.get();
            UnitProdOpr(uniteProd, _unitProd);
            uniteProdRepository.save(_unitProd);
            return new APIResponse(HttpStatus.OK.value(), _unitProd, "Mise a jour avec Success.");
        }
        else {
            return new APIResponse(HttpStatus.NOT_FOUND.value(), null, "L'unité de production est untrouvable.");
        }
    }

    private void UnitProdOpr(UniteProd unitProd, UniteProd _unitProd){
        _unitProd.setAdresse(unitProd.getAdresse());
        _unitProd.setDesignation(unitProd.getDesignation());
        _unitProd.setVille(unitProd.getVille());
    }
}
