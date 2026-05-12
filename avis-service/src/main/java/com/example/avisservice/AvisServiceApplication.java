package com.example.avisservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class AvisServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AvisServiceApplication.class, args);
    }
}
