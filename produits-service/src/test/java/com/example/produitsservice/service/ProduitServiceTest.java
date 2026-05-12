package com.example.produitsservice.service;

import com.example.produitsservice.entity.Categorie;
import com.example.produitsservice.entity.Produit;
import com.example.produitsservice.repository.CategorieRepository;
import com.example.produitsservice.repository.ProduitRepository;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class ProduitServiceTest {

    @Mock
    private ProduitRepository produitRepository;

    @Mock
    private CategorieRepository categorieRepository;

    @InjectMocks
    private ProduitService produitService;

    @Test
    void shouldReturnProductsByCategory() {
        Categorie categorie = new Categorie(1L, "Test");
        Produit produit = new Produit(1L, "Produit", 10.0, 5, categorie);
        given(produitRepository.findByCategorieId(1L)).willReturn(List.of(produit));

        List<Produit> result = produitService.findProduits(1L);

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getNom()).isEqualTo("Produit");
    }

    @Test
    void shouldThrowWhenCategoryNotFoundOnCreate() {
        Produit produit = new Produit(null, "Produit", 10.0, 5, new Categorie(99L, null));
        given(categorieRepository.findById(anyLong())).willReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> produitService.createProduit(produit));
    }

    @Test
    void shouldCreateProduitWhenCategoryExists() {
        Categorie categorie = new Categorie(1L, "Test");
        Produit produit = new Produit(null, "Produit", 10.0, 5, new Categorie(1L, null));
        Produit saved = new Produit(1L, "Produit", 10.0, 5, categorie);
        given(categorieRepository.findById(1L)).willReturn(Optional.of(categorie));
        given(produitRepository.save(any(Produit.class))).willReturn(saved);

        Produit result = produitService.createProduit(produit);

        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getCategorie().getNom()).isEqualTo("Test");
    }
}
