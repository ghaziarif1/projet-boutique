# Projet Boutique — Architecture Microservices

## Architecture
- **eureka-server** (port 8761) — Service Discovery
- **produits-service** (port 8091) — Gestion produits & catégories
- **avis-service** (port 8092) — Gestion des avis
- **api-gateway** (port 8090) — Point d'entrée unique
- **mobile-app** — Application mobile React Native / Expo

## Prérequis
- JDK 25+
- Maven 3.9+
- Docker Desktop
- Node.js + npm (pour mobile-app)
- Expo CLI (optionnel pour mobile-app)

## Lancer le projet (Docker Compose)
```bash
docker-compose up --build
```

## Accès aux services
- API Gateway : http://localhost:8090
- Eureka Dashboard : http://localhost:8761
- Swagger produits : http://localhost:8091/swagger-ui.html
- Swagger avis : http://localhost:8092/swagger-ui.html

## Détails des microservices
- **produits-service** : Spring Boot 4, PostgreSQL, Redis cache, Swagger UI.
- **avis-service** : Spring Boot 4, PostgreSQL, Feign client pour validation produit, Swagger UI.
- **api-gateway** : Spring Cloud Gateway avec routage vers produits-service et avis-service.

## Base de données
- `postgres-produits` : base `produitsdb`
- `postgres-avis` : base `avisdb`

## Application mobile
Le client React Native utilise l'API Gateway pour :
1. Récupérer les catégories (`GET /api/categories`)
2. Lister les produits d'une catégorie (`GET /api/produits?categorieId={id}`)
3. Afficher les avis d'un produit (`GET /api/avis/{produitId}`)

### Exécution mobile
```bash
cd mobile-app
npm install
npm start
```

## Tests (projets Spring Boot)
- Unit tests : `produits-service/src/test/java/.../ProduitServiceTest.java`
- Data JPA integration test : `produits-service/src/test/java/.../ProduitRepositoryIT.java`

## Branches suggérées
- `version1` : parties 1 à 4
- `version2` : parties 5 à 6, tests et mobile app

## Remarque
Si vous utilisez un appareil Android réel ou un émulateur différent, mettez à jour l'URL de l'API dans `mobile-app/App.js` vers l'adresse IP de la machine hôte (`http://<IP>:8090`).
