package ensa.pfa.kitcoop.repositories;

import ensa.pfa.kitcoop.models.Personnel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonnelRepository extends JpaRepository<Personnel, Long> {

    Optional<Personnel> findByMatricule(String matricule);
}
