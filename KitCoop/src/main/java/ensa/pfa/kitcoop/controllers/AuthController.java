package ensa.pfa.kitcoop.controllers;

import ensa.pfa.kitcoop.models.User;
import ensa.pfa.kitcoop.payload.requests.LoginRequest;
import ensa.pfa.kitcoop.payload.requests.ResetRequest;
import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.services.AuthService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/login")
    public ResponseEntity<APIResponse> login(@RequestBody @Valid LoginRequest loginRequest){
        APIResponse apiResponse = authService.login(loginRequest);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/change-password")
    public ResponseEntity<APIResponse> changePassword(@RequestBody @Valid ResetRequest resetRequest) throws MessagingException {
        APIResponse apiResponse = authService.changePassword(resetRequest);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
    @PostMapping("/api/reset-password")
    public ResponseEntity<APIResponse> resetPassword(@PathVariable Long id, @RequestBody String password ) throws MessagingException {
        APIResponse apiResponse = authService.resetPassword(id, password);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }


    //  THIS IS JUST FOR TESTING PURPOSES
    @PostMapping("/api/insert")
    public ResponseEntity<APIResponse> login(@RequestBody User user){
        APIResponse apiResponse = authService.insert(user);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @GetMapping("/api/verify")
    public RedirectView verifyUserEmail(@RequestParam("token") String verificationToken) {
        authService.verifyUserEmail(verificationToken);
        return new RedirectView("http://localhost:3000/verified");
    }
}
