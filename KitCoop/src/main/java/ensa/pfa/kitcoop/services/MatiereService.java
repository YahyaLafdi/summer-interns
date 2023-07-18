package ensa.pfa.kitcoop.services;

import ensa.pfa.kitcoop.exception.InternalErrorException;
import ensa.pfa.kitcoop.models.Matiere;
import ensa.pfa.kitcoop.models.Produit;
import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.repositories.FournisseurRepository;
import ensa.pfa.kitcoop.repositories.MatiereRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MatiereService {

    private final MatiereRepository matiereRepository;
    private final FournisseurRepository fournisseurRepository;

    @Autowired
    public MatiereService(MatiereRepository matiereRepository, FournisseurRepository fournisseurRepository){
        this.matiereRepository = matiereRepository;
        this.fournisseurRepository = fournisseurRepository;
    }

    public APIResponse getAllMatiere(){
        try {
            List<Matiere> matieres = new ArrayList<Matiere>();
            matiereRepository.findAll().forEach(matieres::add);
            if(matieres.isEmpty()){
                return new APIResponse(HttpStatus.NO_CONTENT.value(), null, "Aucune matiere ou fourniture n'est trouvé. Essayer d'en ajouter un.");
            }
            return new APIResponse(HttpStatus.OK.value(), matieres, "OK.");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }

    public APIResponse createMatiere(Matiere matiere){
        try {
            Matiere newMatiere = new Matiere();
            matiereOpr(matiere, newMatiere);
            Matiere savedMatiere = matiereRepository.save(newMatiere);
            return new APIResponse(HttpStatus.CREATED.value(), savedMatiere, "Ajouter avec success");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }
    public APIResponse createMatiere(List<Matiere> matieres) {
        try {
            List<Matiere> savedMatieres = new ArrayList<>();
            for (Matiere matiere : matieres) {
                Matiere newMatiere = new Matiere();
                matiereOpr(matiere, newMatiere);
                Matiere savedMatiere= matiereRepository.save(newMatiere);
                savedMatieres.add(savedMatiere);
            }
            return new APIResponse(HttpStatus.CREATED.value(), savedMatieres, "Ajouté avec succès");
        } catch (Exception e) {
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayez plus tard...");
        }
    }

    public APIResponse deleteMatiere(Long id){
        try {
            matiereRepository.deleteById(id);
            return new APIResponse(HttpStatus.NO_CONTENT.value(), null, "Supprimer avec succes.");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }

    public APIResponse getMatiereById(Long id){
        Optional<Matiere> matiereData = matiereRepository.findById(id);
        if(matiereData.isPresent()){
            return new APIResponse(HttpStatus.OK.value(), matiereData.get(), "Une matiere ou fourniture est trouvée.");
        }
        else {
            return new APIResponse(HttpStatus.NOT_FOUND.value(), null, "La matiere ou la fourniture est untrouvable.");
        }
    }

    public APIResponse updateMatiere(Long id, Matiere matiere){
        Optional<Matiere> matiereData = matiereRepository.findById(id);
        if(matiereData.isPresent()){
            Matiere _matiere = matiereData.get();
            matiereOpr(matiere, _matiere);
            matiereRepository.save(_matiere);
            return new APIResponse(HttpStatus.OK.value(), _matiere, "Mise a jour avec Success.");
        }
        else {
            return new APIResponse(HttpStatus.NOT_FOUND.value(), null, "La matiere ou la fourniture est untrouvable.");
        }
    }

    private void matiereOpr(Matiere matiere, Matiere _matiere) {
        _matiere.setIntitule(matiere.getIntitule());
        _matiere.setFamille(matiere.getFamille());
        _matiere.setRegion(matiere.getRegion());
        _matiere.setQuantite(matiere.getQuantite());
        _matiere.setSeuil(matiere.getSeuil());
        _matiere.setNomFournisseur(matiere.getNomFournisseur());
    }


}
