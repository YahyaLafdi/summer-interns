package ensa.pfa.kitcoop.controllers;

import ensa.pfa.kitcoop.models.Achat;
import ensa.pfa.kitcoop.models.Matiere;
import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.services.AchatService;
import oracle.ucp.proxy.annotation.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class AchatController {
    private final AchatService achatService;

    @Autowired
    public AchatController(AchatService achatService){
        this.achatService = achatService;
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/achats")
    public ResponseEntity<APIResponse> createOrder(@RequestBody Achat achat){
        APIResponse apiResponse = achatService.createOrder(achat);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }
    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @GetMapping("/api/achats")
    public ResponseEntity<APIResponse> getAllOrders(){
        APIResponse apiResponse = achatService.getAllOrders();
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @DeleteMapping("/api/achats")
    public ResponseEntity<APIResponse> deleteAllOrders(){
        APIResponse apiResponse = achatService.deleteAllOrders();
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @GetMapping("/api/achats/{id}")
    public ResponseEntity<APIResponse> getOrderById(@PathVariable("id") Long id){
        APIResponse apiResponse = achatService.getOrderById(id);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @DeleteMapping("/api/achats/{id}")
    public ResponseEntity<APIResponse> deleteOrder(@PathVariable("id") Long id){
        APIResponse apiResponse = achatService.deleteOrder(id);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/achats/{id}")
    public ResponseEntity<APIResponse> updateOrder(@PathVariable("id") Long id, @RequestBody Achat achat){
        APIResponse apiResponse = achatService.updateOrder(id, achat);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }
}
