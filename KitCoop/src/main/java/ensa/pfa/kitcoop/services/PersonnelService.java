package ensa.pfa.kitcoop.services;

import ensa.pfa.kitcoop.exception.InternalErrorException;
import ensa.pfa.kitcoop.models.Adherent;
import ensa.pfa.kitcoop.models.Client;
import ensa.pfa.kitcoop.models.Enfant;
import ensa.pfa.kitcoop.models.Personnel;
import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.repositories.EnfantRepository;
import ensa.pfa.kitcoop.repositories.PersonnelRepository;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PersonnelService {

    private final PersonnelRepository personnelRepository;
    private final AdherentService adherentService;
    private final EnfantRepository enfantRepository;
    Log log = LogFactory.getLog(this.getClass());

    public PersonnelService(PersonnelRepository personnelRepository, AdherentService adherentService, EnfantRepository enfantRepository){
        this.personnelRepository = personnelRepository;
        this.adherentService = adherentService;
        this.enfantRepository = enfantRepository;
    }

    public APIResponse getAllPersonnels(){
        try {
            List<Personnel> personnels = new ArrayList<Personnel>();
            personnelRepository.findAll().forEach(personnels::add);
            if(personnels.isEmpty()){
                return new APIResponse(HttpStatus.NO_CONTENT.value(), null, "Pas de personnel. Essayer d'en ajouter un.");
            }
            return new APIResponse(HttpStatus.OK.value(), personnels, "OK.");
        }catch (Exception e){
            System.out.println(e);
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }

    public APIResponse deletePersonnel(Long id){
        try {
        personnelRepository.deleteById(id);
        return new APIResponse(HttpStatus.NO_CONTENT.value(), null, "Supprimer avec succes.");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }

    public APIResponse createPersonnel(Personnel personnel){
        try {
           // enfantRepository.saveAll(personnel.getEnfants());
            Personnel newPersonnel = new Personnel();
            personOpr(personnel, newPersonnel);
            //enfantRepository.saveAll(newPersonnel.getEnfants());
            Personnel savedPersonnel = personnelRepository.save(newPersonnel);
            for(Enfant e : personnel.getEnfants()){
                e.setParent(savedPersonnel);
                log.info(e);
                System.out.println(e);
            }
            enfantRepository.saveAll(personnel.getEnfants());
            Adherent adherent = new Adherent();
            if(personnel.getIsAdherent()) {
                adherent.setDdn(personnel.getDdn());
                adherent.setDdd(personnel.getDateDepart());
                adherent.setCin(personnel.getCin());
                adherent.setNbrEnfant(personnel.getNombreEnfants());
                adherent.setAdresse(personnel.getAdresse());
                adherent.setVille(personnel.getVille());
                adherent.setSituationFamiliale(personnel.getSituationFamiliale());
                adherent.setNiveauEtudes(personnel.getNiveauEtudes());
                adherent.setNom(personnel.getNom());
                adherent.setPrenom(personnel.getPrenom());
                adherent.setPhotoUrl(personnel.getPhotoUrl());
                adherent.setTelephone(personnel.getTelephone());
                adherent.setDda(personnel.getDda());
                adherent.setNbrPartSociale(personnel.getNbrPartSociale());
                adherent.setMotif(personnel.getMatricule());
                adherentService.createAdherent(adherent);
            }
            log.info("Nouveau personnel ajouté avec succès !");
            return new APIResponse(HttpStatus.CREATED.value(), personnel, "Ajouter avec success");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }

    public APIResponse createPersonnel(List<Personnel> personnels) {
        try {
            List<Personnel> savedPersonnels = new ArrayList<>();
            for (Personnel personnel : personnels) {
                Personnel newPersonnel = new Personnel();
                personOpr(personnel, newPersonnel);
                Personnel savedAdherent= personnelRepository.save(newPersonnel);
                savedPersonnels.add(savedAdherent);
            }
            return new APIResponse(HttpStatus.CREATED.value(), savedPersonnels, "Ajouté avec succès");
        } catch (Exception e) {
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayez plus tard...");
        }
    }

    public APIResponse getPersonnelById(Long id){
        Optional<Personnel> personnelData = personnelRepository.findById(id);
        if(personnelData.isPresent()){
            return new APIResponse(HttpStatus.OK.value(), personnelData.get(), "A Personnel Found.");
        }
        else {
            return new APIResponse(HttpStatus.NOT_FOUND.value(), null, "Personnel unfound ");
        }
    }

    public APIResponse updatePersonnel(Long id, Personnel personnel){
        Optional<Personnel> personnelData = personnelRepository.findById(id);
        if(personnelData.isPresent()){
            Personnel _personnel = personnelData.get();
            personOpr(personnel, _personnel);
            personnelRepository.save(_personnel);
            return new APIResponse(HttpStatus.OK.value(), _personnel, "Mise a jour avec Success.");
        }
        else {
            return new APIResponse(HttpStatus.NOT_FOUND.value(), null, "Personnel unfound ");
        }
    }

    private void personOpr(Personnel personnel, Personnel _personnel) {
        _personnel.setMatricule(personnel.getMatricule());
        _personnel.setIsAdherent(personnel.getIsAdherent());
        _personnel.setNom(personnel.getNom());
        _personnel.setPrenom(personnel.getPrenom());
        _personnel.setNiveauEtudes(personnel.getNiveauEtudes());
        _personnel.setSexe(personnel.getSexe());
        _personnel.setPhotoUrl(personnel.getPhotoUrl());
        _personnel.setDdn(personnel.getDdn());
        _personnel.setFonction(personnel.getFonction());
        _personnel.setCin(personnel.getCin());
        _personnel.setCnss(personnel.getCnss());
        _personnel.setAdresse(personnel.getAdresse());
        _personnel.setVille(personnel.getVille());
        _personnel.setDateEmbauche(personnel.getDateEmbauche());
        _personnel.setBasePaiement(personnel.getBasePaiement());
        _personnel.setTauxPaiement(personnel.getTauxPaiement());
        _personnel.setIsDeclareCnss(personnel.getIsDeclareCnss());
        _personnel.setTelephone(personnel.getTelephone());
        _personnel.setSituationFamiliale(personnel.getSituationFamiliale());
        _personnel.setNombreEnfants(personnel.getNombreEnfants());
        _personnel.setDateDepart(personnel.getDateDepart());
        _personnel.setRenseignements(personnel.getRenseignements());
        _personnel.setDda(personnel.getDda());
        _personnel.setMotif(personnel.getMotif());
        _personnel.setNbrPartSociale(personnel.getNbrPartSociale());
    }

}
