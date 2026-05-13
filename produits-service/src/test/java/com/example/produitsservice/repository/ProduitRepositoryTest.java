package com.example.produitsservice.repository;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.context.annotation.Import;

import com.example.produitsservice.config.TestCacheConfig;
import com.example.produitsservice.entity.Categorie;
import com.example.produitsservice.entity.Produit;

@DataJpaTest
@Import(TestCacheConfig.class)
class ProduitRepositoryTest {

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private CategorieRepository categorieRepository;

    @Test
    void shouldSaveAndReadProducts() {
        Categorie categorie = categorieRepository.save(new Categorie(null, "Informatique"));
        produitRepository.save(new Produit(null, "Clavier mécanique", 79.99, 50, categorie));

        assertThat(categorieRepository.count()).isGreaterThanOrEqualTo(1);
        assertThat(produitRepository.count()).isGreaterThanOrEqualTo(1);
    }

    @Test
    void shouldFindProductsByCategory() {
        Categorie categorie = categorieRepository.save(new Categorie(null, "Maison"));
        produitRepository.save(new Produit(null, "Lampe de bureau", 24.50, 75, categorie));

        var produits = produitRepository.findByCategorieId(categorie.getId());

        assertThat(produits).isNotEmpty();
        assertThat(produits).allSatisfy(produit -> assertThat(produit.getCategorie().getId()).isEqualTo(categorie.getId()));
    }
}
