package com.example.avisservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.avisservice.entity.Avis;

public interface AvisRepository extends JpaRepository<Avis, Long> {
    List<Avis> findAllByProduitId(Long produitId);
}
