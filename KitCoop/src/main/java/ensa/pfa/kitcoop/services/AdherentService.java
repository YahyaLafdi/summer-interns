package ensa.pfa.kitcoop.services;

import ensa.pfa.kitcoop.exception.InternalErrorException;
import ensa.pfa.kitcoop.models.Adherent;
import ensa.pfa.kitcoop.models.Client;
import ensa.pfa.kitcoop.models.Personnel;
import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.repositories.AdherentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AdherentService {

    private final AdherentRepository adherentRepository;

    @Autowired
    public AdherentService(AdherentRepository adherentRepository){
        this.adherentRepository = adherentRepository;
    }

    public APIResponse getAllAdherent(){
        try {
            List<Adherent> adherents = new ArrayList<Adherent>();
            adherentRepository.findAll().forEach(adherents::add);
            if(adherents.isEmpty()){
                return new APIResponse(HttpStatus.NO_CONTENT.value(), null, "Aucun adherent n'est trouvé. Essayer d'en ajouter un.");
            }
            return new APIResponse(HttpStatus.OK.value(), adherents, "OK.");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }

    public APIResponse createAdherent(Adherent adherent){
        try {
            Adherent newAdherent = new Adherent();
            adherentOpr(adherent, newAdherent);
            Adherent savedAdherent = adherentRepository.save(newAdherent);
            return new APIResponse(HttpStatus.CREATED.value(), savedAdherent, "Ajouter avec success");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }
    public APIResponse createAdherent(List<Adherent> adherents) {
        try {
            List<Adherent> savedAdherents = new ArrayList<>();
            for (Adherent adherent : adherents) {
                Adherent newAdherent = new Adherent();
                adherentOpr(adherent, newAdherent);
                Adherent savedAdherent= adherentRepository.save(newAdherent);
                savedAdherents.add(savedAdherent);
            }
            return new APIResponse(HttpStatus.CREATED.value(), savedAdherents, "Ajouté avec succès");
        } catch (Exception e) {
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayez plus tard...");
        }
    }

    public APIResponse deleteAdherent(Long id){
        try {
            adherentRepository.deleteById(id);
            return new APIResponse(HttpStatus.NO_CONTENT.value(), null, "Supprimer avec succes.");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }

    public APIResponse getAdherentById(Long id){
        Optional<Adherent> adherentData = adherentRepository.findById(id);
        if(adherentData.isPresent()){
            return new APIResponse(HttpStatus.OK.value(), adherentData.get(), "An Adherent Found.");
        }
        else {
            return new APIResponse(HttpStatus.NOT_FOUND.value(), null, "Adherent unfound ");
        }
    }

    public APIResponse updateAdherent(Long id, Adherent adherent){
        Optional<Adherent> adherentData = adherentRepository.findById(id);
        if(adherentData.isPresent()){
            Adherent _adherent = adherentData.get();
            adherentOpr(adherent, _adherent);
            adherentRepository.save(_adherent);
            return new APIResponse(HttpStatus.OK.value(), _adherent, "Mise a jour avec Success.");
        }
        else {
            return new APIResponse(HttpStatus.NOT_FOUND.value(), null, "Adherent unfound ");
        }
    }

    private void adherentOpr(Adherent adherent, Adherent _adherent) {
        _adherent.setNom(adherent.getNom());
        _adherent.setPrenom(adherent.getPrenom());
        _adherent.setDdn(adherent.getDdn());
        _adherent.setCin(adherent.getCin());
        _adherent.setTelephone(adherent.getTelephone());
        _adherent.setAdresse(adherent.getAdresse());
        _adherent.setVille(adherent.getVille());
        _adherent.setNiveauEtudes(adherent.getNiveauEtudes());
        _adherent.setDda(adherent.getDda());
        _adherent.setDdd(adherent.getDdd());
        _adherent.setMotif(adherent.getMotif());
        _adherent.setNbrPartSociale(adherent.getNbrPartSociale());
        _adherent.setSituationFamiliale(adherent.getSituationFamiliale());
        _adherent.setNbrEnfant(adherent.getNbrEnfant());
        _adherent.setPhotoUrl(adherent.getPhotoUrl());
    }

}
