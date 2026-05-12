package com.example.produitsservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.produitsservice.entity.Categorie;

public interface CategorieRepository extends JpaRepository<Categorie, Long> {
}
