package ensa.pfa.kitcoop.payload.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetRequest {
    @Email
    private String email;
    @Size(min = 6,max = 100)
    private String newPassword;
    @NotBlank
    private String token;
}
