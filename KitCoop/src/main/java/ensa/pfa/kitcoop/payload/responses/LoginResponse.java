package ensa.pfa.kitcoop.payload.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {
    private boolean passwordChanged;
    private String token;
    private String role;
}
