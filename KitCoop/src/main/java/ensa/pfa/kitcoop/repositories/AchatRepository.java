package ensa.pfa.kitcoop.repositories;

import ensa.pfa.kitcoop.models.Achat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AchatRepository extends JpaRepository<Achat, Long> {
}
