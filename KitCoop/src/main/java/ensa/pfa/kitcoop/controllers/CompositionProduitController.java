package ensa.pfa.kitcoop.controllers;

import ensa.pfa.kitcoop.models.CompositionProduit;
import ensa.pfa.kitcoop.payload.requests.CompositionProduitRequestDTO;
import ensa.pfa.kitcoop.services.CompositionProduitService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@AllArgsConstructor
public class CompositionProduitController {
    private final CompositionProduitService compositionProduitService;

    @PostMapping("/api/compositions")
    public ResponseEntity<CompositionProduit> save(@RequestBody CompositionProduitRequestDTO compositionProduitRequestDTO) {
        CompositionProduit compositionProduit = compositionProduitService.create(compositionProduitRequestDTO);
        compositionProduit = compositionProduitService.save(compositionProduit);
        return ResponseEntity.status(HttpStatus.CREATED).body(compositionProduit);
    }

}
