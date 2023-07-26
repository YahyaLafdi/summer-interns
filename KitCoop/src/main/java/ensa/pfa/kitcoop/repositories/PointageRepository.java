package ensa.pfa.kitcoop.repositories;

import ensa.pfa.kitcoop.models.Pointage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PointageRepository extends JpaRepository<Pointage, Long> {
}
