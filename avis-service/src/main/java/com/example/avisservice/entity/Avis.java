package com.example.avisservice.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "avis")
public class Avis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "L'ID du produit est requis")
    private Long produitId;

    @NotBlank(message = "L'auteur est requis")
    private String auteur;

    @NotBlank(message = "Le commentaire est requis")
    private String commentaire;

    @NotNull(message = "La note est requise")
    @Min(value = 1, message = "La note doit être au moins 1")
    @Max(value = 5, message = "La note doit être au maximum 5")
    private Integer note;

    public Avis() {
    }

    public Avis(Long id, Long produitId, String auteur, String commentaire, Integer note) {
        this.id = id;
        this.produitId = produitId;
        this.auteur = auteur;
        this.commentaire = commentaire;
        this.note = note;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProduitId() {
        return produitId;
    }

    public void setProduitId(Long produitId) {
        this.produitId = produitId;
    }

    public String getAuteur() {
        return auteur;
    }

    public void setAuteur(String auteur) {
        this.auteur = auteur;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public Integer getNote() {
        return note;
    }

    public void setNote(Integer note) {
        this.note = note;
    }
}
