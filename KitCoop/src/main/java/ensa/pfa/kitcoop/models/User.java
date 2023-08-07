package ensa.pfa.kitcoop.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import ensa.pfa.kitcoop.models.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "USERS")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "USERNAME")
    private String username;

    @Column(name = "PASSWORD")
    private String password;


    @Column(name = "ROLE")
    private String role;

    @Column(name = "PWD_CHANGED")
    private boolean pwdChanged;

    @Column(name = "PICTURE")
    private String picture;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "VERIFICATION_TOKEN")
    private String verificationToken;
}
