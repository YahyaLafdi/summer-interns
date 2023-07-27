package ensa.pfa.kitcoop.services.impl;

import ensa.pfa.kitcoop.models.CompositionProduit;
import ensa.pfa.kitcoop.models.Matiere;
import ensa.pfa.kitcoop.models.Produit;
import ensa.pfa.kitcoop.payload.requests.CompositionProduitRequestDTO;
import ensa.pfa.kitcoop.repositories.CompositionProduitRepository;
import ensa.pfa.kitcoop.repositories.MatiereRepository;
import ensa.pfa.kitcoop.repositories.ProduitRepository;
import ensa.pfa.kitcoop.services.CompositionProduitService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.function.Predicate;

@Slf4j
@AllArgsConstructor
@Service
public class CompositionProduitImpl implements CompositionProduitService {
    private final CompositionProduitRepository compositionProduitRepository;
    private final ProduitRepository produitRepository;
    private final MatiereRepository matiereRepository;

    @Override
    public CompositionProduit save(CompositionProduit compositionProduit) {
        final Long id = compositionProduit.getId();
        if (id == null) {
            return compositionProduitRepository.save(compositionProduit);
        }
        final Optional<CompositionProduit> entityExist = compositionProduitRepository.findById(id);
        if (entityExist.isEmpty()) {
            return compositionProduitRepository.save(compositionProduit);
        } else {
            log.warn("already exists");
            throw new RuntimeException("already exists");
        }
    }

    @Override
    public CompositionProduit create(CompositionProduitRequestDTO compositionProduitRequestDTO) {
        CompositionProduit compositionProduit;
        Produit produit = produitRepository.findById(compositionProduitRequestDTO.produitId()).get();
        Matiere matiere = matiereRepository.findById(compositionProduitRequestDTO.matiereId()).get();
        double quantite = compositionProduitRequestDTO.quantite();
        Predicate<Matiere> isQuantiteValid = m -> matiere.getQuantite() > quantite;
        if (isQuantiteValid.test(matiere)) {
            compositionProduit = CompositionProduit.builder()
                    .produit(produit)
                    .matiere(matiere)
                    .quantite(quantite)
                    .build();
        } else {
            log.warn("quantite is not valid");
            throw new RuntimeException("quantite is not valid");
        }
        return compositionProduit;
    }
}
