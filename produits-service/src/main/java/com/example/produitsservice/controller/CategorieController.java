package com.example.produitsservice.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.produitsservice.entity.Categorie;
import com.example.produitsservice.service.CategorieService;

@RestController
@RequestMapping("/api/categories")
public class CategorieController {

    private final CategorieService categorieService;

    public CategorieController(CategorieService categorieService) {
        this.categorieService = categorieService;
    }

    @GetMapping
    public List<Categorie> getAllCategories() {
        return categorieService.findAll();
    }

    @GetMapping("/{id}")
    public Categorie getCategorieById(@PathVariable Long id) {
        return categorieService.findById(id);
    }
}
