package ensa.pfa.kitcoop.services;

import ensa.pfa.kitcoop.exception.InternalErrorException;
import ensa.pfa.kitcoop.models.Produit;
import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.repositories.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProduitService {
    private final ProduitRepository produitRepository;

    @Autowired
    public ProduitService(ProduitRepository produitRepository){
        this.produitRepository = produitRepository;
    }

    public APIResponse createProduit(Produit produit){
        try {
            Produit newProd = new Produit();
            ProdOpr(produit, newProd);
            Produit savedProduit = produitRepository.save(newProd);
            return new APIResponse(HttpStatus.CREATED.value(), savedProduit, "Ajouter avec success");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }

    public APIResponse createProduits(List<Produit> produits) {
        try {
            List<Produit> savedProduits = new ArrayList<>();
            for (Produit produit : produits) {
                Produit newProd = new Produit();
                ProdOpr(produit, newProd);
                Produit savedProduit = produitRepository.save(newProd);
                savedProduits.add(savedProduit);
            }
            return new APIResponse(HttpStatus.CREATED.value(), savedProduits, "Ajouté avec succès");
        } catch (Exception e) {
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayez plus tard...");
        }
    }

    public APIResponse getProduitById(Long id){
        Optional<Produit> produitData = produitRepository.findById(id);
        if(produitData.isPresent()){
            return new APIResponse(HttpStatus.OK.value(), produitData.get(), "Un produit est trouvée.");
        }
        else {
            return new APIResponse(HttpStatus.NOT_FOUND.value(), null, "Le produit est untrouvable.");
        }
    }

    public APIResponse getAllProduit(){
        try {
            List<Produit> produits = new ArrayList<Produit>();
            produitRepository.findAll().forEach(produits::add);
            if(produits.isEmpty()){
                return new APIResponse(HttpStatus.NO_CONTENT.value(), null, "Aucun produit n'est trouvée. Essayer d'en ajouter un.");
            }
            return new APIResponse(HttpStatus.OK.value(), produits, "OK.");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }

    public APIResponse deleteProduit(Long id){
        try {
            produitRepository.deleteById(id);
            return new APIResponse(HttpStatus.NO_CONTENT.value(), null, "Supprimer avec succes.");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }

    public APIResponse updateProduit(Long id, Produit uniteProd){
        Optional<Produit> produitData = produitRepository.findById(id);
        if(produitData.isPresent()){
            Produit _produit = produitData.get();
            ProdOpr(uniteProd, _produit);
            produitRepository.save(_produit);
            return new APIResponse(HttpStatus.OK.value(), _produit, "Mise a jour avec Success.");
        }
        else {
            return new APIResponse(HttpStatus.NOT_FOUND.value(), null, "L'unité de production est untrouvable.");
        }
    }

    private void ProdOpr(Produit produit, Produit _produit){
        _produit.setIntitule(produit.getIntitule());
        _produit.setLieuStockage(produit.getLieuStockage());
        _produit.setPrixUnitaire(produit.getPrixUnitaire());
        _produit.setSeuil(produit.getSeuil());
        //_produit.setQuantiteStock(produit.getQuantiteStock());
        _produit.setUniteMesure(produit.getUniteMesure());

    }
}
