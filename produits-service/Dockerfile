FROM maven:3.9.8-eclipse-temurin-21 AS build
WORKDIR /workspace
COPY pom.xml ./
COPY eureka-server ./eureka-server
COPY api-gateway ./api-gateway
COPY produits-service ./produits-service
COPY avis-service ./avis-service
RUN mvn -B -DskipTests package -pl produits-service -am && ls -la produits-service/target/*.jar

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /workspace/produits-service/target/*.jar app.jar
EXPOSE 8091
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
