package com.example.avisservice.controller;

import com.example.avisservice.entity.Avis;
import com.example.avisservice.service.AvisService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/avis")
public class AvisController {

    private final AvisService avisService;

    public AvisController(AvisService avisService) {
        this.avisService = avisService;
    }

    @GetMapping("/{produitId}")
    public List<Avis> getAvisByProduit(@PathVariable Long produitId) {
        return avisService.findByProduitId(produitId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Avis createAvis(@Valid @RequestBody Avis avis) {
        return avisService.saveAvis(avis);
    }
}
