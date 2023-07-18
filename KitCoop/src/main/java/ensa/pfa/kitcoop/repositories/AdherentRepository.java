package ensa.pfa.kitcoop.repositories;

import ensa.pfa.kitcoop.models.Adherent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdherentRepository extends JpaRepository<Adherent, Long> {
}
