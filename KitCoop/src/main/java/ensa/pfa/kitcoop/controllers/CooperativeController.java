package ensa.pfa.kitcoop.controllers;

import ensa.pfa.kitcoop.models.Client;
import ensa.pfa.kitcoop.models.Cooperative;
import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.services.CooperativeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class CooperativeController {
    private final CooperativeService cooperativeService;

    @Autowired
    public CooperativeController(CooperativeService cooperativeService){
        this.cooperativeService=cooperativeService;
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/cooperatives")
    public ResponseEntity<APIResponse> createCooperative(@RequestBody Cooperative cooperative){
        APIResponse apiResponse = cooperativeService.createCooperative(cooperative);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @GetMapping("/api/cooperatives")
    public ResponseEntity<APIResponse> checkIfCooperativeExist(){
        APIResponse apiResponse = cooperativeService.checkIfCooperativeExist();
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @DeleteMapping("/api/cooperatives/{id}")
    public ResponseEntity<APIResponse> deleteCooperative(@PathVariable("id") Long id){
        APIResponse apiResponse = cooperativeService.deleteCooperative(id);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @GetMapping("/api/cooperatives/{id}")
    public ResponseEntity<APIResponse> getCooperativeById(@PathVariable("id") Long id){
        APIResponse apiResponse = cooperativeService.getCooperativeById(id);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }



    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/cooperatives/{id}")
    public ResponseEntity<APIResponse> updateCooperative(@PathVariable("id") Long id, @RequestBody Cooperative cooperative){
        APIResponse apiResponse = cooperativeService.updateCooperative(id, cooperative);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }
}
