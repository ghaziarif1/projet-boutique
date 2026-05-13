package com.example.produitsservice.repository;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.context.TestPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import com.example.produitsservice.config.TestCacheConfig;
import com.example.produitsservice.entity.Categorie;
import com.example.produitsservice.entity.Produit;

@DataJpaTest
@Import(TestCacheConfig.class)
@Testcontainers
@TestPropertySource(properties = "spring.test.database.replace=NONE")
class ProduitRepositoryContainerTest {

    @Container
    static final PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
            .withDatabaseName("testdb")
            .withUsername("postgres")
            .withPassword("postgres");

    @DynamicPropertySource
    static void registerDataSourceProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private CategorieRepository categorieRepository;

    @Test
    void shouldSaveProductUsingPostgreSQLContainer() {
        Categorie categorie = categorieRepository.save(new Categorie(null, "Testcontainer"));
        Produit produit = produitRepository.save(new Produit(null, "Clavier", 69.99, 20, categorie));

        assertThat(produit.getId()).isNotNull();
        assertThat(produitRepository.findById(produit.getId())).isPresent();
    }
}
