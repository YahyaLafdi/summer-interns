package ensa.pfa.kitcoop.controllers;

import ensa.pfa.kitcoop.models.Fournisseur;
import ensa.pfa.kitcoop.models.Matiere;
import ensa.pfa.kitcoop.models.Produit;
import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.services.FournisseurService;
import ensa.pfa.kitcoop.services.MatiereService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class MatiereController {

    private final MatiereService matiereService;

    @Autowired
    public MatiereController(MatiereService matiereService){
        this.matiereService = matiereService;
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @GetMapping("/api/matieres")
    public ResponseEntity<APIResponse> getAllMatieres(){
        APIResponse apiResponse = matiereService.getAllMatiere();
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/matieres")
    public ResponseEntity<APIResponse> createMatiere(@RequestBody Matiere matiere){
        APIResponse apiResponse = matiereService.createMatiere(matiere);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/matieres-list")
    public ResponseEntity<APIResponse> createMatieres(@RequestBody List<Matiere> matieres) {
        APIResponse apiResponse = matiereService.createMatiere(matieres);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @DeleteMapping("/api/matieres/{id}")
    public ResponseEntity<APIResponse> deleteMatiere(@PathVariable("id") Long id){
        APIResponse apiResponse = matiereService.deleteMatiere(id);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @GetMapping("/api/matieres/{id}")
    public ResponseEntity<APIResponse> getMatiereById(@PathVariable("id") Long id){
        APIResponse apiResponse = matiereService.getMatiereById(id);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/matieres/{id}")
    public ResponseEntity<APIResponse> updateMatiere(@PathVariable("id") Long id, @RequestBody Matiere matiere){
        APIResponse apiResponse = matiereService.updateMatiere(id, matiere);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }
}
