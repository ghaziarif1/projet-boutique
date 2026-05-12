package com.example.avisservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "produits-service", path = "/api/produits")
public interface ProduitClient {

    @GetMapping("/{id}")
    ProduitDto getProduit(@PathVariable("id") Long id);
}
