package ensa.pfa.kitcoop.controllers;

import ensa.pfa.kitcoop.services.RegistrePaieService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
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
}
