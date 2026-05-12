package com.example.produitsservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.produitsservice.entity.Produit;

public interface ProduitRepository extends JpaRepository<Produit, Long> {
    List<Produit> findByCategorieId(Long categorieId);
}
