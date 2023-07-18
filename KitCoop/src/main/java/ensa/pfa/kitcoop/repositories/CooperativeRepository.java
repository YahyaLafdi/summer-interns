package ensa.pfa.kitcoop.repositories;

import ensa.pfa.kitcoop.models.Cooperative;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CooperativeRepository extends JpaRepository<Cooperative, Long> {
}
