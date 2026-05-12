package com.example.produitsservice.service;

import com.example.produitsservice.entity.Categorie;
import com.example.produitsservice.entity.Produit;
import com.example.produitsservice.repository.CategorieRepository;
import com.example.produitsservice.repository.ProduitRepository;
import java.util.List;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ProduitService {

    private final ProduitRepository produitRepository;
    private final CategorieRepository categorieRepository;

    public ProduitService(ProduitRepository produitRepository, CategorieRepository categorieRepository) {
        this.produitRepository = produitRepository;
        this.categorieRepository = categorieRepository;
    }

    @Cacheable(value = "produits", key = "#categorieId != null ? #categorieId : 'all'")
    public List<Produit> findProduits(Long categorieId) {
        if (categorieId != null) {
            return produitRepository.findByCategorieId(categorieId);
        }
        return produitRepository.findAll();
    }

    public Produit findById(Long id) {
        return produitRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produit non trouvé"));
    }

    @Transactional
    @CacheEvict(value = "produits", allEntries = true)
    public Produit createProduit(Produit produit) {
        if (produit.getCategorie() == null || produit.getCategorie().getId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La catégorie est requise");
        }
        Categorie categorie = categorieRepository.findById(produit.getCategorie().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Catégorie non trouvée"));
        produit.setCategorie(categorie);
        return produitRepository.save(produit);
    }
}
