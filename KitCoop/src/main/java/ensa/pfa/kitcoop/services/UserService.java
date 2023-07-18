package ensa.pfa.kitcoop.services;

import ensa.pfa.kitcoop.exception.InternalErrorException;
import ensa.pfa.kitcoop.models.User;
import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public APIResponse getAllUsers() {
        try {
            List<User> users = new ArrayList<>();
            userRepository.findAll().forEach(users::add);
            if (users.isEmpty()) {
                return new APIResponse(HttpStatus.NO_CONTENT.value(), null, "No users found.");
            }
            return new APIResponse(HttpStatus.OK.value(), users, "OK.");
        } catch (Exception e) {
            throw new InternalErrorException("Something went wrong. Please try again later.");
        }
    }

    public APIResponse createUser(User user) {
        try {
            if (userRepository.existsByUsername(user.getUsername())) {
                return new APIResponse(HttpStatus.CONFLICT.value(), null, "Username already exists.");
            }

            BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
            String cryptedPassword = bCryptPasswordEncoder.encode(user.getPassword());
            user.setPassword(cryptedPassword);
            User newUser = new User();
            userOperation(user, newUser);
            User savedUser = userRepository.save(newUser);
            return new APIResponse(HttpStatus.CREATED.value(), savedUser, "User created successfully.");
        } catch (Exception e) {
            System.out.println(e);
            throw new InternalErrorException("Something went wrong. Please try again later.");
        }
    }

    public APIResponse deleteUser(Long id) {
        try {
            userRepository.deleteById(id);
            return new APIResponse(HttpStatus.NO_CONTENT.value(), null, "User deleted successfully.");
        } catch (Exception e) {
            throw new InternalErrorException("Something went wrong. Please try again later.");
        }
    }

    public APIResponse getUserById(Long id) {
        Optional<User> userData = userRepository.findById(id);
        if (userData.isPresent()) {
            return new APIResponse(HttpStatus.OK.value(), userData.get(), "User found.");
        } else {
            return new APIResponse(HttpStatus.NOT_FOUND.value(), null, "User not found.");
        }
    }

    public APIResponse updateUser(Long id, User user) {
        Optional<User> userData = userRepository.findById(id);
        if (userData.isPresent()) {
            User existingUser = userData.get();
            userOperation(user, existingUser);
            userRepository.save(existingUser);
            return new APIResponse(HttpStatus.OK.value(), existingUser, "User updated successfully.");
        } else {
            return new APIResponse(HttpStatus.NOT_FOUND.value(), null, "User not found.");
        }
    }

    private void userOperation(User user, User existingUser) {
        existingUser.setUsername(user.getUsername());
        existingUser.setPassword(user.getPassword());
        existingUser.setRole(user.getRole().toUpperCase());
        existingUser.setPwdChanged(user.isPwdChanged());
        existingUser.setEmail(user.getEmail());
        existingUser.setVerificationToken(user.getVerificationToken());
    }
}
