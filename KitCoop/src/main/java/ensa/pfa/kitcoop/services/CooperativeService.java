package ensa.pfa.kitcoop.services;

import ensa.pfa.kitcoop.exception.InternalErrorException;
import ensa.pfa.kitcoop.models.Client;
import ensa.pfa.kitcoop.models.Cooperative;
import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.repositories.CooperativeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CooperativeService {
    private final CooperativeRepository cooperativeRepository;

    @Autowired
    public CooperativeService(CooperativeRepository cooperativeRepository){
        this.cooperativeRepository = cooperativeRepository;
    }


    public APIResponse createCooperative(Cooperative cooperative){
        try {
            Cooperative newCooperative = new Cooperative();
            copyCooperativeProperties(cooperative, newCooperative);
            Cooperative savedCooperative = cooperativeRepository.save(newCooperative);
            return new APIResponse(HttpStatus.CREATED.value(), savedCooperative, "Ajouter avec success");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }

    public APIResponse getCooperativeById(Long id){
        Optional<Cooperative> cooperativeData = cooperativeRepository.findById(id);
        if(cooperativeData.isPresent()){
            return new APIResponse(HttpStatus.OK.value(), cooperativeData.get(), "La cooperative est trouvé.");
        }
        else {
            return new APIResponse(HttpStatus.NOT_FOUND.value(), null, "La cooperative est introuvable.");
        }
    }

    public APIResponse checkIfCooperativeExist(){
        try {
            List<Cooperative> cooperatives = new ArrayList<Cooperative>();
            cooperativeRepository.findAll().forEach(cooperatives::add);
            if(cooperatives.isEmpty()){
                return new APIResponse(HttpStatus.OK.value(), null, "Aucune cooperative n'est trouvé. Essayer d'en ajouter un.");
            }
            return new APIResponse(HttpStatus.OK.value(), cooperatives, "OK.");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }

    public APIResponse getYourCooperativeDirectly(){
        try {
            List<Cooperative> cooperatives = new ArrayList<Cooperative>();
            cooperativeRepository.findAll().forEach(cooperatives::add);
            if(cooperatives.isEmpty()){
                return new APIResponse(HttpStatus.NO_CONTENT.value(), null, "Aucune cooperative n'est trouvé. Essayer d'en ajouter un.");
            }
            return new APIResponse(HttpStatus.OK.value(), cooperatives, "OK.");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }

    public APIResponse updateCooperative(Long id, Cooperative cooperative){
        Optional<Cooperative> cooperativeData = cooperativeRepository.findById(id);
        if(cooperativeData.isPresent()){
            Cooperative _cooperative = cooperativeData.get();
            copyCooperativeProperties(cooperative, _cooperative);
            cooperativeRepository.save(_cooperative);
            return new APIResponse(HttpStatus.OK.value(), _cooperative, "Mise a jour avec Success.");
        }
        else {
            return new APIResponse(HttpStatus.NOT_FOUND.value(), null, "Le fournisseur est introuvable.");
        }
    }

    public APIResponse deleteCooperative(Long id){
        try {
            cooperativeRepository.deleteById(id);
            return new APIResponse(HttpStatus.NO_CONTENT.value(), null, "Supprimer avec succes.");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }

    private void copyCooperativeProperties(Cooperative sourceCooperative, Cooperative targetCooperative) {
        targetCooperative.setNom(sourceCooperative.getNom());
        targetCooperative.setAdresse(sourceCooperative.getAdresse());
        targetCooperative.setVille(sourceCooperative.getVille());
        targetCooperative.setActivite(sourceCooperative.getActivite());
        targetCooperative.setPresident(sourceCooperative.getPresident());
        targetCooperative.setDirecteur(sourceCooperative.getDirecteur());
        targetCooperative.setDateCreation(sourceCooperative.getDateCreation());
        targetCooperative.setCapitaleSociale(sourceCooperative.getCapitaleSociale());
        targetCooperative.setNombreAdherent(sourceCooperative.getNombreAdherent());
        targetCooperative.setNombrePersonnel(sourceCooperative.getNombrePersonnel());
        targetCooperative.setNumAgrement(sourceCooperative.getNumAgrement());
        targetCooperative.setTelephone(sourceCooperative.getTelephone());
        targetCooperative.setFax(sourceCooperative.getFax());
        targetCooperative.setEmail(sourceCooperative.getEmail());
        targetCooperative.setSiteWeb(sourceCooperative.getSiteWeb());
    }

}
