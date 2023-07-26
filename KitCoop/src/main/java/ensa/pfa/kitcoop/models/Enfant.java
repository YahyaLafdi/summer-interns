package ensa.pfa.kitcoop.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Setter
@Getter
@Table(name = "ENFANT")
public class Enfant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ENFANT_ID")
    private Long id;
    @Column(name = "NOM_ENFANT")
    private String nom;
    @Column(name = "EST_SCOLARISE")
    private Boolean isScolarised;
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "DATE_NAISSANCE")
    private Date ddn;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    @JsonBackReference
    private Personnel parent;

}
