package ensa.pfa.kitcoop.controllers;

import ensa.pfa.kitcoop.models.Adherent;
import ensa.pfa.kitcoop.models.Fournisseur;
import ensa.pfa.kitcoop.models.Produit;
import ensa.pfa.kitcoop.models.enums.CurrentState;
import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.services.AdherentService;
import ensa.pfa.kitcoop.services.FournisseurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class FournisseurController {

    private final FournisseurService fournisseurService;

    @Autowired
    public FournisseurController(FournisseurService fournisseurService){
        this.fournisseurService = fournisseurService;
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @GetMapping("/api3/fournisseurs")
    public ResponseEntity<APIResponse> getAllFournisseur(){
        APIResponse apiResponse = fournisseurService.getAllFournisseurs();
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/fournisseurs")
    public ResponseEntity<APIResponse> createFournisseur(@RequestBody Fournisseur fournisseur){
        APIResponse apiResponse = fournisseurService.createFournisseur(fournisseur);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/fournisseurs-list")
    public ResponseEntity<APIResponse> createProducts(@RequestBody List<Fournisseur> fournisseurs) {
        APIResponse apiResponse = fournisseurService.createFournisseur(fournisseurs);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @DeleteMapping("/api/fournisseurs/{id}")
    public ResponseEntity<APIResponse> deleteFournisseur(@PathVariable("id") Long id){
        APIResponse apiResponse = fournisseurService.deleteFournisseur(id);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @GetMapping("/api/fournisseurs/{id}")
    public ResponseEntity<APIResponse> getFournisseurById(@PathVariable("id") Long id){
        APIResponse apiResponse = fournisseurService.getFournisseurById(id);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/fournisseurs/{id}")
    public ResponseEntity<APIResponse> updateFournisseur(@PathVariable("id") Long id, @RequestBody Fournisseur fournisseur){
        APIResponse apiResponse = fournisseurService.updateFournisseur(id, fournisseur);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }
    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PatchMapping("/api/fournisseurs/{id}/disable")
    public ResponseEntity<APIResponse> disableFournisseur(@PathVariable("id") Long id){
        Fournisseur temp = (Fournisseur) fournisseurService.getFournisseurById(id).getData();
        temp.setState(CurrentState.DISABLED);
        APIResponse apiResponse = fournisseurService.updateFournisseur(id, temp);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }
}
