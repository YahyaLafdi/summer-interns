package ensa.pfa.kitcoop.controllers;

import ensa.pfa.kitcoop.models.UniteProd;
import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.services.UniteProdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class UnitProdController {
    private final UniteProdService uniteProdService;

    @Autowired
    public UnitProdController(UniteProdService uniteProdService){
        this.uniteProdService = uniteProdService;
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @GetMapping("/api/produnit")
    public ResponseEntity<APIResponse> getAllUnitProd(){
        APIResponse apiResponse = uniteProdService.getAllUnitProd();
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/produnit")
    public ResponseEntity<APIResponse> createAdherent(@RequestBody UniteProd uniteProd){
        APIResponse apiResponse = uniteProdService.createUniteProd(uniteProd);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @DeleteMapping("/api/produnit/{id}")
    public ResponseEntity<APIResponse> deleteAdherent(@PathVariable("id") Long id){
        APIResponse apiResponse = uniteProdService.deleteUnitProds(id);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @GetMapping("/api/produnit/{id}")
    public ResponseEntity<APIResponse> getAdherentById(@PathVariable("id") Long id){
        APIResponse apiResponse = uniteProdService.getUnitProdById(id);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/produnit/{id}")
    public ResponseEntity<APIResponse> updatePersonnel(@PathVariable("id") Long id, @RequestBody UniteProd uniteProd){
        APIResponse apiResponse = uniteProdService.updateUnitProd(id, uniteProd);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }
}
