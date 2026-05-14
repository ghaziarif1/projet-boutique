package com.example.apigateway;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator customRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("produits-route", r -> r
                        .path("/api/produits/**", "/api/categories/**")
                        .uri("lb://produits-service"))
                .route("avis-route", r -> r
                        .path("/api/avis/**")
                        .uri("lb://avis-service"))
                .build();
    }
}
