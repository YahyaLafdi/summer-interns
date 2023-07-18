package ensa.pfa.kitcoop.repositories;

import ensa.pfa.kitcoop.models.EtiquetteMatiere;
import ensa.pfa.kitcoop.models.Matiere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EtiquetteMatiereRepository extends JpaRepository<EtiquetteMatiere, Long> {
}
