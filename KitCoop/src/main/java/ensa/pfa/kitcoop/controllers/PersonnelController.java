package ensa.pfa.kitcoop.controllers;

import ensa.pfa.kitcoop.models.Adherent;
import ensa.pfa.kitcoop.models.Client;
import ensa.pfa.kitcoop.models.Personnel;
import ensa.pfa.kitcoop.payload.requests.LoginRequest;
import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.services.AdherentService;
import ensa.pfa.kitcoop.services.AuthService;
import ensa.pfa.kitcoop.services.PersonnelService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
public class PersonnelController {
    private final PersonnelService personnelService;
    private final AdherentService adherentService;

    @Autowired
    public PersonnelController(PersonnelService personnelService, AdherentService adherentService){
        this.personnelService = personnelService;
        this.adherentService = adherentService;
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @GetMapping("/api/personnels")
    public ResponseEntity<APIResponse> getAllPersonnel(){
        APIResponse apiResponse = personnelService.getAllPersonnels();
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }
    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/personnels")
    public ResponseEntity<APIResponse> createPersonnel(@RequestBody Personnel personnel){
        APIResponse apiResponse = personnelService.createPersonnel(personnel);
        Adherent adherent = new Adherent();
        if(personnel.getIsAdherent()){
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


            //adherent.setIsAdherent(personnel.getIsAdherent());
            adherentService.createAdherent(adherent);
        }
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/personnels-list")
    public ResponseEntity<APIResponse> createPersonnels(@RequestBody List<Personnel> personnels) {
        APIResponse apiResponse = personnelService.createPersonnel(personnels);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @DeleteMapping("/api/personnels/{id}")
    public ResponseEntity<APIResponse> deletePersonnel(@PathVariable("id") Long id){
        APIResponse apiResponse = personnelService.deletePersonnel(id);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @GetMapping("/api/personnels/{id}")
    public ResponseEntity<APIResponse> getPersonnelById(@PathVariable("id") Long id){
        APIResponse apiResponse = personnelService.getPersonnelById(id);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/personnels/{id}")
    public ResponseEntity<APIResponse> updatePersonnel(@PathVariable("id") Long id, @RequestBody Personnel personnel){
        APIResponse apiResponse = personnelService.updatePersonnel(id, personnel);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

}
