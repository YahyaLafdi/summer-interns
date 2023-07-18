package ensa.pfa.kitcoop.services;

import ensa.pfa.kitcoop.exception.IncorrectCredentialsException;
import ensa.pfa.kitcoop.exception.InternalErrorException;
import ensa.pfa.kitcoop.exception.InvalidTokenException;
import ensa.pfa.kitcoop.exception.ResourceNotFoundException;
import ensa.pfa.kitcoop.models.enums.Role;
import ensa.pfa.kitcoop.models.User;
import ensa.pfa.kitcoop.payload.requests.LoginRequest;
import ensa.pfa.kitcoop.payload.requests.ResetRequest;
import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.payload.responses.LoginResponse;
import ensa.pfa.kitcoop.repositories.UserRepository;
import ensa.pfa.kitcoop.security.jwt.JwtUtils;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    private final EmailService emailService;

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       JwtUtils jwtUtils, EmailService emailService){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.emailService = emailService;
    }

    public APIResponse login(LoginRequest loginRequest){
            User user = userRepository.findByUsername(loginRequest.getUsername()).orElseThrow(() -> new IncorrectCredentialsException("Le nom d'utilisateur ou le mot de passe est incorrect."));
            String password = user.getPassword();
            boolean isCorrect = passwordEncoder.matches(loginRequest.getPassword(),password );
            if (!isCorrect){
                throw new IncorrectCredentialsException("Le nom d'utilisateur ou le mot de passe est incorrect.");
            }

            ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(user);

            LoginResponse loginResponse = new LoginResponse(user.isPwdChanged(), jwtCookie.getValue(), user.getRole());
            return new APIResponse(HttpStatus.OK.value(), loginResponse,
                    "Connected Successfully.");



    }

    public APIResponse changePassword(ResetRequest resetRequest) throws MessagingException {
        String token = resetRequest.getToken();
        String username = jwtUtils.getUsernameFromToken(token);
        System.out.println(username);
        User user = userRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("This user is not found."));
        user.setPassword(passwordEncoder.encode(resetRequest.getNewPassword()));
        user.setPwdChanged(true);
        user.setEmail(resetRequest.getEmail());
            // Generate verification token
            String verificationToken = UUID.randomUUID().toString();
            // Save user with verification token
            user.setVerificationToken(verificationToken);
            // Send verification email
            emailService.sendVerificationEmail(user.getEmail(), verificationToken);

        userRepository.save(user);
        return new APIResponse(HttpStatus.OK.value(), null,
                "Password changed successfully. Verification email sent Successfully.");
    }

    public void verifyUserEmail(String token){
        User user = userRepository.findByVerificationToken(token).orElseThrow(() -> new InvalidTokenException("Invalid Token."));
        userRepository.save(user);
   }

   public APIResponse checkIfEmailExists(String email){
        boolean check = userRepository.existsByEmail(email);
        if(check){
            return new APIResponse(HttpStatus.OK.value(), check, "Trouvé avec success.");
        }else {
            return new APIResponse(HttpStatus.NOT_FOUND.value(), check, "Trouvé avec success.");
        }
   }

   public APIResponse resetPassword(Long userId, String newPassword){
       User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("This user is not found."));
       user.setPassword(passwordEncoder.encode(newPassword));
       userRepository.save(user);
       return new APIResponse(HttpStatus.OK.value(), null, "Votre mot de passe est changé avec succes.");
   }


    //  THIS IS JUST FOR TESTING PURPOSES
    public APIResponse insert(User usr){
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String cryptedPassword = bCryptPasswordEncoder.encode(usr.getPassword());

        User user = new User();
        user.setPassword(cryptedPassword);
        user.setUsername(usr.getUsername());
        user.setRole(usr.getRole());
        user.setPwdChanged(usr.isPwdChanged());
        userRepository.save(user);
        return new APIResponse(HttpStatus.OK.value(), user,
                "Connected Successfully.");

    }
}
