package ensa.pfa.kitcoop.controllers;

import ensa.pfa.kitcoop.models.User;
import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @GetMapping("/api/utilisateurs")
    public ResponseEntity<APIResponse> getAllUsers() {
        APIResponse apiResponse = userService.getAllUsers();
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/utilisateurs")
    public ResponseEntity<APIResponse> createUser(@RequestBody User user) {
        APIResponse apiResponse = userService.createUser(user);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @DeleteMapping("/api/utilisateurs/{id}")
    public ResponseEntity<APIResponse> deleteUser(@PathVariable("id") Long id) {
        APIResponse apiResponse = userService.deleteUser(id);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @GetMapping("/api/utilisateurs/{id}")
    public ResponseEntity<APIResponse> getUserById(@PathVariable("id") Long id) {
        APIResponse apiResponse = userService.getUserById(id);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/utilisateurs/{id}")
    public ResponseEntity<APIResponse> updateUser(@PathVariable("id") Long id, @RequestBody User user) {
        APIResponse apiResponse = userService.updateUser(id, user);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }
}
