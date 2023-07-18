package ensa.pfa.kitcoop.services;

import ensa.pfa.kitcoop.exception.InternalErrorException;
import ensa.pfa.kitcoop.exception.ResourceNotFoundException;
import ensa.pfa.kitcoop.models.*;
import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.repositories.AchatRepository;
import ensa.pfa.kitcoop.repositories.FournisseurRepository;
import ensa.pfa.kitcoop.repositories.MatiereRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AchatService {
    private final AchatRepository achatRepository;
    private final MatiereRepository matiereRepository;

    private final FournisseurRepository fournisseurRepository;

    @Autowired
    public AchatService(AchatRepository achatRepository, MatiereRepository matiereRepository,
                        FournisseurRepository fournisseurRepository){
        this.achatRepository = achatRepository;
        this.matiereRepository = matiereRepository;
        this.fournisseurRepository = fournisseurRepository;
    }

    public APIResponse createOrder(Achat achatRequest){
            Achat achat = new Achat();
            achatMatiereOpr(achatRequest, achat);
            Optional<Matiere> mat = matiereRepository.findById(achat.getIdMatiere());
            Matiere matiere = mat.get();
            achat.setNomMatiere(matiere.getIntitule());
            achat.setTotal(achat.getPrixUnitaire()*achat.getQuantite()*(1+achat.getTva()));
            if(achat.isStatus()){
                matiere.setQuantite(matiere.getQuantite()+ achat.getQuantite());
                matiereRepository.save(matiere);
            }
            Achat savedAchat = achatRepository.save(achat);
            return new APIResponse(HttpStatus.CREATED.value(), savedAchat, "Ajouter avec success");

    }
    public APIResponse getAllOrders(){
        try {
            List<Achat> achats = new ArrayList<Achat>();
            achatRepository.findAll().forEach(achats::add);
            if(achats.isEmpty()){
                return new APIResponse(HttpStatus.NO_CONTENT.value(), null, "Aucune achat n'est effectuée. Essayer d'en ajouter un.");
            }
            return new APIResponse(HttpStatus.OK.value(), achats, "OK.");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }

    public APIResponse getOrderById(Long id){
        Optional<Achat> achatData = achatRepository.findById(id);
        if(achatData.isPresent()){
            return new APIResponse(HttpStatus.OK.value(), achatData.get(), "An Order Found.");
        }
        else {
            return new APIResponse(HttpStatus.NOT_FOUND.value(), null, "Order unfound ");
        }
    }

    public APIResponse deleteAllOrders(){
        try {
            achatRepository.deleteAll();
            return new APIResponse(HttpStatus.NO_CONTENT.value(), null, "Supprimer avec succes.");
        }catch (Exception e){
        throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
            }
    }

    public APIResponse deleteOrder(Long id){
        try {
            achatRepository.deleteById(id);
            return new APIResponse(HttpStatus.NO_CONTENT.value(), null, "Supprimer avec succes.");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }

    public APIResponse updateOrder(Long id, Achat achat){
        Optional<Achat> achatData = achatRepository.findById(id);
        if(achatData.isPresent()){
            Achat _achat = achatData.get();
            boolean previousStatus = _achat.isStatus();
            achatMatiereOpr(achat, _achat);


            if(achat.isStatus() && !previousStatus){
                Matiere matiere = matiereRepository.findById(achat.getIdMatiere()).orElseThrow(()->new ResourceNotFoundException("Matiere avec Id : "+achat.getIdMatiere()+" introuvable"));
                matiere.setQuantite(matiere.getQuantite()+ _achat.getQuantite());
                matiereRepository.save(matiere);
            }else if (!achat.isStatus() && previousStatus) {
                Matiere matiere = matiereRepository.findById(achat.getIdMatiere()).orElseThrow(() -> new ResourceNotFoundException("Matiere avec Id : " + achat.getIdMatiere() + " introuvable"));
                matiere.setQuantite(matiere.getQuantite() - _achat.getQuantite());
                matiereRepository.save(matiere);
            }
            achatRepository.save(_achat);
            return new APIResponse(HttpStatus.OK.value(), _achat, "Mise a jour avec Success.");
        }
        else {
            return new APIResponse(HttpStatus.NOT_FOUND.value(), null, "La matiere ou la fourniture est untrouvable.");
        }
    }

    private void achatMatiereOpr(Achat achatMatiere, Achat _achatMatiere) {
        _achatMatiere.setNomFournisseur(achatMatiere.getNomFournisseur());
        _achatMatiere.setIdMatiere(achatMatiere.getIdMatiere());
        _achatMatiere.setDateCommande(achatMatiere.getDateCommande());
        _achatMatiere.setPrixUnitaire(achatMatiere.getPrixUnitaire());
        _achatMatiere.setTva(achatMatiere.getTva());
        _achatMatiere.setQuantite(achatMatiere.getQuantite());
        _achatMatiere.setStatus(achatMatiere.isStatus());
    }

}
