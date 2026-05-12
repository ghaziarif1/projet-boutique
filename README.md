# Projet Boutique — Architecture Microservices

## Architecture
- **eureka-server** (port 8761) — Service Discovery
- **produits-service** (port 8091) — Gestion produits & catégories
- **avis-service** (port 8092) — Gestion des avis
- **api-gateway** (port 8090) — Point d'entrée unique

## Prérequis
- JDK 21+
- Maven 3.9+
- Docker Desktop
- Flutter SDK

## Lancer le projet (Docker Compose)
```bash
docker-compose up --build
Accès aux services
•	API Gateway : http://localhost:8090
•	Eureka Dashboard : http://localhost:8761
•	Swagger produits : http://localhost:8091/swagger-ui.html
•	Swagger avis : http://localhost:8092/swagger-ui.html