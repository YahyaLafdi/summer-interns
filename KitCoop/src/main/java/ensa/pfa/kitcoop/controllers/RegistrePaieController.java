package ensa.pfa.kitcoop.controllers;

import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.services.RegistrePaieService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/paies")
@AllArgsConstructor
public class RegistrePaieController {
    private final RegistrePaieService registrePaieService;
    @GetMapping
    public ResponseEntity<?> getAllRegistres(){
        try{
            return ResponseEntity.ok(registrePaieService.getAllRegistres());
        }catch (Exception e){
            return (ResponseEntity<?>) ResponseEntity.badRequest();
        }

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRegistree(@PathVariable("id") Long id){
        APIResponse apiResponse = registrePaieService.deleteRegistreById(id);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getRegistreById(@PathVariable("id") Long id){
        APIResponse apiResponse = registrePaieService.getRegistreById(id);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }
}
