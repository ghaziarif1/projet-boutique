# Projet Boutique — Architecture Microservices

## Architecture
- **eureka-server** (port 8761) — Service Discovery
- **produits-service** (port 8091) — Gestion produits & catégories
- **avis-service** (port 8092) — Gestion des avis
- **api-gateway** (port 8090) — Point d'entrée unique
- **mobile-app** — Application mobile React Native / Expo

## Dépôt GitHub
- Repository : https://github.com/ghaziarif1/projet-boutique

## Branches
- `version1` : parties 1 à 4
- `version2` : parties 5 à 6, tests et mobile app

## Prérequis
- Docker Desktop
- JDK 21+
- Maven 3.9+
- Node.js + npm

## Exécution dans Docker
Le projet est conçu pour s'exécuter entièrement via Docker Compose.
Toutes les API back-end sont déployées par Docker Compose :
- `postgres-produits`, `postgres-avis`, `redis`
- `eureka-server`, `produits-service`, `avis-service`, `api-gateway`

Lancer le projet :
```bash
docker-compose up --build -d
```

Arrêter le projet :
```bash
docker-compose down
```

## Accès aux services
- API Gateway : http://localhost:8090
- Eureka Dashboard : http://localhost:8761
- Swagger produits : http://localhost:8091/swagger-ui.html
- Swagger avis : http://localhost:8092/swagger-ui.html

## Tests
### Tests Java
```bash
mvn -pl produits-service test
```

### Tests Cypress E2E
```bash
npm install
npm run cy:run
```

## Mobile App
L'application mobile React Native utilise uniquement l'API Gateway :
- `GET /api/categories`
- `GET /api/produits?categorieId={id}`
- `GET /api/avis/{produitId}`

Lancer l'application mobile :
```bash
cd mobile-app
npm install
npm start
```

> Si vous utilisez un appareil Android réel ou un émulateur différent, mettez à jour l'URL de l'API dans `mobile-app/App.js` vers `http://<IP>:8090`.

## Notes techniques
- `produits-service` utilise Redis cache sur `GET /api/produits` avec `@Cacheable` et invalide le cache sur `POST /api/produits` avec `@CacheEvict`
- `avis-service` vérifie l'existence du produit via un `@FeignClient(name = "produits-service")`
- L'API Gateway route les appels vers les services correspondants
- Les tests d'intégration incluent Testcontainers PostgreSQL dans `produits-service`
- Les tests E2E Cypress couvrent le parcours API Gateway
