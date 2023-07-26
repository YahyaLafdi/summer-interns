package ensa.pfa.kitcoop.services;

import ensa.pfa.kitcoop.exception.InternalErrorException;
import ensa.pfa.kitcoop.models.Adherent;
import ensa.pfa.kitcoop.models.Fournisseur;
import ensa.pfa.kitcoop.models.Produit;
import ensa.pfa.kitcoop.models.enums.CurrentState;
import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.repositories.FournisseurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FournisseurService {

    private final FournisseurRepository fournisseurRepository;

    @Autowired
    public FournisseurService(FournisseurRepository fournisseurRepository){
        this.fournisseurRepository = fournisseurRepository;
    }

    public APIResponse getAllFournisseurs(){
        try {
            List<Fournisseur> fournisseurs = new ArrayList<Fournisseur>();
            fournisseurRepository.findAll().forEach(fournisseurs::add);
            if(fournisseurs.isEmpty()){
                return new APIResponse(HttpStatus.NO_CONTENT.value(), null, "Aucun fournisseur n'est trouvé. Essayer d'en ajouter un.");
            }
            return new APIResponse(HttpStatus.OK.value(), fournisseurs, "OK.");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }

    public APIResponse createFournisseur(Fournisseur fournisseur){
        try {
            Fournisseur newFournisseur = new Fournisseur();
            fournisseurOpr(fournisseur, newFournisseur);
            newFournisseur.setState(CurrentState.ENABLED);
            Fournisseur savedFournisseur = fournisseurRepository.save(newFournisseur);
            return new APIResponse(HttpStatus.CREATED.value(), savedFournisseur, "Ajouter avec success");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }

    public APIResponse createFournisseur(List<Fournisseur> fournisseurs) {
        try {
            List<Fournisseur> savedFournisseurs = new ArrayList<>();
            for (Fournisseur fournisseur : fournisseurs) {
                Fournisseur newFourn = new Fournisseur();
                fournisseurOpr(fournisseur, newFourn);
                Fournisseur savedFrn = fournisseurRepository.save(newFourn);
                savedFournisseurs.add(savedFrn);
            }
            return new APIResponse(HttpStatus.CREATED.value(), savedFournisseurs, "Ajouté avec succès");
        } catch (Exception e) {
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayez plus tard...");
        }
    }

    public APIResponse deleteFournisseur(Long id){
        try {
            fournisseurRepository.deleteById(id);
            return new APIResponse(HttpStatus.NO_CONTENT.value(), null, "Supprimer avec succes.");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }

    public APIResponse getFournisseurById(Long id){
        Optional<Fournisseur> fournisseurData = fournisseurRepository.findById(id);
        if(fournisseurData.isPresent()){
            return new APIResponse(HttpStatus.OK.value(), fournisseurData.get(), "un fournisseur est trouvé.");
        }
        else {
            return new APIResponse(HttpStatus.NOT_FOUND.value(), null, "Le fournisseur est introuvable.");
        }
    }

    public APIResponse updateFournisseur(Long id, Fournisseur fournisseur){
        Optional<Fournisseur> fournisseurData = fournisseurRepository.findById(id);
        if(fournisseurData.isPresent()){
            Fournisseur _fournisseur = fournisseurData.get();
            fournisseurOpr(fournisseur, _fournisseur);
            fournisseurRepository.save(_fournisseur);
            return new APIResponse(HttpStatus.OK.value(), _fournisseur, "Mise a jour avec Success.");
        }
        else {
            return new APIResponse(HttpStatus.NOT_FOUND.value(), null, "Le fournisseur est introuvable.");
        }
    }

    private void fournisseurOpr(Fournisseur fournisseur, Fournisseur _fournisseur) {
        _fournisseur.setNom(fournisseur.getNom());
        _fournisseur.setCategorie(fournisseur.getCategorie());
        _fournisseur.setAdresse(fournisseur.getAdresse());
        _fournisseur.setVille(fournisseur.getVille());
        _fournisseur.setNomContact(fournisseur.getNomContact());
        _fournisseur.setTeleContact(fournisseur.getTeleContact());
        _fournisseur.setCin(fournisseur.getCin());
        _fournisseur.setRc(fournisseur.getRc());
        _fournisseur.setTp(fournisseur.getTp());
        _fournisseur.setIf_valid(fournisseur.getIf_valid());
        _fournisseur.setIce(fournisseur.getIce());
        _fournisseur.setTelephone(fournisseur.getTelephone());
        _fournisseur.setFax(fournisseur.getFax());
        _fournisseur.setEmail(fournisseur.getEmail());
        _fournisseur.setSiteWeb(fournisseur.getSiteWeb());

    }

}
