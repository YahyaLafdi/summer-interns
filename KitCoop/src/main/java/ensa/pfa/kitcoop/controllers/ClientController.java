package ensa.pfa.kitcoop.controllers;

import ensa.pfa.kitcoop.models.Client;
import ensa.pfa.kitcoop.models.Matiere;
import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class ClientController {

    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService){
        this.clientService = clientService;
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @GetMapping("/api/clients")
    public ResponseEntity<APIResponse> getAllClient(){
        APIResponse apiResponse = clientService.getAllClient();
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/clients")
    public ResponseEntity<APIResponse> createClient(@RequestBody Client client){
        APIResponse apiResponse = clientService.createClient(client);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/clients-list")
    public ResponseEntity<APIResponse> createClient(@RequestBody List<Client> clients) {
        APIResponse apiResponse = clientService.createClient(clients);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @DeleteMapping("/api/clients/{id}")
    public ResponseEntity<APIResponse> deleteClient(@PathVariable("id") Long id){
        APIResponse apiResponse = clientService.deleteClient(id);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @GetMapping("/api/clients/{id}")
    public ResponseEntity<APIResponse> getClientById(@PathVariable("id") Long id){
        APIResponse apiResponse = clientService.getClientById(id);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/clients/{id}")
    public ResponseEntity<APIResponse> updateClient(@PathVariable("id") Long id, @RequestBody Client client){
        APIResponse apiResponse = clientService.updateClient(id, client);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }
}
