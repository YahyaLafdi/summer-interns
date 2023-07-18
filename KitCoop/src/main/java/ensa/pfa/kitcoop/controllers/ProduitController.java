package ensa.pfa.kitcoop.controllers;

import ensa.pfa.kitcoop.models.Produit;
import ensa.pfa.kitcoop.models.UniteProd;
import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.services.ProduitService;
import ensa.pfa.kitcoop.services.UniteProdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class ProduitController {
    private final ProduitService produitService;

    @Autowired
    public ProduitController(ProduitService produitService){
        this.produitService = produitService;
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @GetMapping("/api/produits")
    public ResponseEntity<APIResponse> getAllProduit(){
        APIResponse apiResponse = produitService.getAllProduit();
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/produits")
    public ResponseEntity<APIResponse> createProduct(@RequestBody Produit produit){
        APIResponse apiResponse = produitService.createProduit(produit);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/produits-list")
    public ResponseEntity<APIResponse> createProducts(@RequestBody List<Produit> produits) {
        APIResponse apiResponse = produitService.createProduits(produits);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }


    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @DeleteMapping("/api/produits/{id}")
    public ResponseEntity<APIResponse> deleteAdherent(@PathVariable("id") Long id){
        APIResponse apiResponse = produitService.deleteProduit(id);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @GetMapping("/api/produits/{id}")
    public ResponseEntity<APIResponse> getAdherentById(@PathVariable("id") Long id){
        APIResponse apiResponse = produitService.getProduitById(id);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/produits/{id}")
    public ResponseEntity<APIResponse> updatePersonnel(@PathVariable("id") Long id, @RequestBody Produit produit){
        APIResponse apiResponse = produitService.updateProduit(id, produit);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }
}
