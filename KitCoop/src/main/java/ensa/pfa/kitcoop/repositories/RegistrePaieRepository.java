package ensa.pfa.kitcoop.repositories;

import ensa.pfa.kitcoop.models.RegistrePaie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistrePaieRepository extends JpaRepository<RegistrePaie, Long> {
}
