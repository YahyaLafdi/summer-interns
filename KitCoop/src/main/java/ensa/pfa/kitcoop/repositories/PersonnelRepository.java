package ensa.pfa.kitcoop.repositories;

import ensa.pfa.kitcoop.models.Personnel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonnelRepository extends JpaRepository<Personnel, Long> {

}
