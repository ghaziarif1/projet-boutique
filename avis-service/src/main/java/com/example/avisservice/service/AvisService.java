package com.example.avisservice.service;

import com.example.avisservice.client.ProduitClient;
import com.example.avisservice.entity.Avis;
import com.example.avisservice.repository.AvisRepository;
import feign.FeignException;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AvisService {

    private final AvisRepository avisRepository;
    private final ProduitClient produitClient;

    public AvisService(AvisRepository avisRepository, ProduitClient produitClient) {
        this.avisRepository = avisRepository;
        this.produitClient = produitClient;
    }

    public List<Avis> findByProduitId(Long produitId) {
        return avisRepository.findAllByProduitId(produitId);
    }

    public Avis saveAvis(Avis avis) {
        try {
            produitClient.getProduit(avis.getProduitId());
        } catch (FeignException.NotFound ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produit introuvable");
        }
        return avisRepository.save(avis);
    }
}
