package ensa.pfa.kitcoop.controllers;

import ensa.pfa.kitcoop.models.Adherent;
import ensa.pfa.kitcoop.models.Client;
import ensa.pfa.kitcoop.models.Personnel;
import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.services.AdherentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class AdherentController {

    private final AdherentService adherentService;

    @Autowired
    public AdherentController(AdherentService adherentService){
        this.adherentService = adherentService;
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @GetMapping("/api/adherents")
    public ResponseEntity<APIResponse> getAllAdherents(){
        APIResponse apiResponse = adherentService.getAllAdherent();
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/adherents")
    public ResponseEntity<APIResponse> createAdherent(@RequestBody Adherent adherent){
        APIResponse apiResponse = adherentService.createAdherent(adherent);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/adherents-list")
    public ResponseEntity<APIResponse> createClient(@RequestBody List<Adherent> adherents) {
        APIResponse apiResponse = adherentService.createAdherent(adherents);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @DeleteMapping("/api/adherents/{id}")
    public ResponseEntity<APIResponse> deleteAdherent(@PathVariable("id") Long id){
        APIResponse apiResponse = adherentService.deleteAdherent(id);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @GetMapping("/api/adherents/{id}")
    public ResponseEntity<APIResponse> getAdherentById(@PathVariable("id") Long id){
        APIResponse apiResponse = adherentService.getAdherentById(id);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/adherents/{id}")
    public ResponseEntity<APIResponse> updatePersonnel(@PathVariable("id") Long id, @RequestBody Adherent adherent){
        APIResponse apiResponse = adherentService.updateAdherent(id, adherent);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }
}
