package ensa.pfa.kitcoop.services;

import ensa.pfa.kitcoop.models.CompositionProduit;
import ensa.pfa.kitcoop.payload.requests.CompositionProduitRequestDTO;

public interface CompositionProduitService {
    CompositionProduit save(CompositionProduit compositionProduit);

    CompositionProduit create(CompositionProduitRequestDTO compositionProduitRequestDTO);
}
