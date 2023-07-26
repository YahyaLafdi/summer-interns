package ensa.pfa.kitcoop.repositories;

import ensa.pfa.kitcoop.models.Enfant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnfantRepository extends JpaRepository<Enfant, Long> {
}
