package ensa.pfa.kitcoop.controllers;

import ensa.pfa.kitcoop.models.Pointage;
import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.services.PointageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
@RequestMapping("/api")
public class PointageController {
    private final PointageService pointageService;

    public PointageController(PointageService pointageService) {
        this.pointageService = pointageService;
    }

    @GetMapping("/pointages")
    public ResponseEntity<?> getPointages(){
        try{
            return ResponseEntity.ok(pointageService.getAllPointages());
        }catch (Exception e){
            return new ResponseEntity<>( false, HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/pointages")
    public ResponseEntity<?> insertPointage(@RequestBody Pointage pointage){
        try{
            return ResponseEntity.ok(pointageService.insertPointage(pointage));
        }catch (Exception e){
            return new ResponseEntity<>( false, HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/pointages/{id}")
    public ResponseEntity<?> getPointageById(@PathVariable("id") Long id){
        APIResponse apiResponse = pointageService.getPointageById(id);
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/pointages/{id}")
    public ResponseEntity<?> updatePointage(@PathVariable("id") Long id,
                                            @RequestBody Pointage pointage){
        APIResponse apiResponse = pointageService.updatePointage(id, pointage);
        return ResponseEntity.ok(apiResponse);
    }

    @DeleteMapping("/pointages/{id}")
    public ResponseEntity<?> deletePointage(@PathVariable("id") Long id){
        APIResponse apiResponse = pointageService.deletePointage(id);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }
}
