FROM maven:3.9.8-eclipse-temurin-21 AS build
WORKDIR /workspace
COPY pom.xml ./
COPY eureka-server ./eureka-server
COPY api-gateway ./api-gateway
COPY produits-service ./produits-service
COPY avis-service ./avis-service
RUN mvn -B -DskipTests package -pl avis-service -am && ls -la avis-service/target/*.jar

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /workspace/avis-service/target/*.jar app.jar
EXPOSE 8092
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
