package ensa.pfa.kitcoop.services;

import ensa.pfa.kitcoop.models.Matiere;
import ensa.pfa.kitcoop.models.Produit;
import ensa.pfa.kitcoop.repositories.MatiereRepository;
import ensa.pfa.kitcoop.repositories.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationService {
    private final ProduitRepository produitRepository;
    private final MatiereRepository matiereRepository;


    @Autowired
    public NotificationService(ProduitRepository produitRepository, MatiereRepository matiereRepository){
        this.produitRepository = produitRepository;
        this.matiereRepository=matiereRepository;
    }

    public List<String> checkSeuilAndSendNotification(){
        List<String> messages = new ArrayList<>();
        List<Produit> produits = produitRepository.findAll();
        List<Matiere> matieres = matiereRepository.findAll();
        for(Produit produit:produits){
            if(produit.getQuantiteStock() <= 0){
                messages.add("Le produit <b>"+ produit.getIntitule()+"</b> est en <b style=\"color:red;\">rupture</b> de stock.");
            }
            else if(produit.getQuantiteStock() < produit.getSeuil()){
                messages.add("La quantité de produit <b>"+ produit.getIntitule()+"</b> est <b>inférieure</b> au seuil.");

            }
        }
        for(Matiere matiere:matieres){
            if(matiere.getQuantite() <= 0){
                messages.add("La matiere <b>"+ matiere.getIntitule()+"</b> est en <b style=\"color:red;\">rupture</b> de stock.");
            }
            else if(matiere.getQuantite() < matiere.getSeuil()){
                messages.add("La quantité du matiere <b>"+ matiere.getIntitule()+"</b> est <b>inférieure</b> au seuil.");

            }
        }
        return messages;
    }
}
