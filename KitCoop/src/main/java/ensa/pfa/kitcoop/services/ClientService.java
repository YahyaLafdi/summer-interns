package ensa.pfa.kitcoop.services;

import ensa.pfa.kitcoop.exception.InternalErrorException;
import ensa.pfa.kitcoop.models.Client;
import ensa.pfa.kitcoop.models.Fournisseur;
import ensa.pfa.kitcoop.models.Matiere;
import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository){
        this.clientRepository = clientRepository;
    }

    public APIResponse createClient(Client client){
        try {
            Client newClient = new Client();
            clientOpr(client, newClient);
            Client savedClient = clientRepository.save(newClient);
            return new APIResponse(HttpStatus.CREATED.value(), savedClient, "Ajouter avec success");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }

    public APIResponse createClient(List<Client> clients) {
        try {
            List<Client> savedClients = new ArrayList<>();
            for (Client client : clients) {
                Client newClient = new Client();
                clientOpr(client, newClient);
                Client savedClient= clientRepository.save(newClient);
                savedClients.add(savedClient);
            }
            return new APIResponse(HttpStatus.CREATED.value(), savedClients, "Ajouté avec succès");
        } catch (Exception e) {
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayez plus tard...");
        }
    }

    public APIResponse getAllClient(){
        try {
            List<Client> clients = new ArrayList<Client>();
            clientRepository.findAll().forEach(clients::add);
            if(clients.isEmpty()){
                return new APIResponse(HttpStatus.NO_CONTENT.value(), null, "Aucun client n'est trouvé. Essayer d'en ajouter un.");
            }
            return new APIResponse(HttpStatus.OK.value(), clients, "OK.");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }

    public APIResponse deleteClient(Long id){
        try {
            clientRepository.deleteById(id);
            return new APIResponse(HttpStatus.NO_CONTENT.value(), null, "Supprimer avec succes.");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }

    public APIResponse getClientById(Long id){
        Optional<Client> clientData = clientRepository.findById(id);
        if(clientData.isPresent()){
            return new APIResponse(HttpStatus.OK.value(), clientData.get(), "un client est trouvé.");
        }
        else {
            return new APIResponse(HttpStatus.NOT_FOUND.value(), null, "Le client est introuvable.");
        }
    }

    public APIResponse updateClient(Long id, Client client){
        Optional<Client> clientData = clientRepository.findById(id);
        if(clientData.isPresent()){
            Client _client = clientData.get();
            clientOpr(client, _client);
            clientRepository.save(_client);
            return new APIResponse(HttpStatus.OK.value(), _client, "Mise a jour avec Success.");
        }
        else {
            return new APIResponse(HttpStatus.NOT_FOUND.value(), null, "Le fournisseur est introuvable.");
        }
    }

    private void clientOpr(Client client, Client _client) {
        _client.setNom(client.getNom());
        _client.setPays(client.getPays());
        _client.setAdresse(client.getAdresse());
        _client.setVille(client.getVille());
        _client.setNomContact(client.getNomContact());
        _client.setTeleContact(client.getTeleContact());
        _client.setCin(client.getCin());
        _client.setRc(client.getRc());
        _client.setTp(client.getTp());
        _client.setIf_valid(client.getIf_valid());
        _client.setIce(client.getIce());
        _client.setTelephone(client.getTelephone());
        _client.setFax(client.getFax());
        _client.setEmail(client.getEmail());
        _client.setSiteWeb(client.getSiteWeb());
    }
}
