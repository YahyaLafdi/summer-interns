package ensa.pfa.kitcoop.repositories;

import ensa.pfa.kitcoop.models.Produit;
import ensa.pfa.kitcoop.models.UniteProd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long> {
}
