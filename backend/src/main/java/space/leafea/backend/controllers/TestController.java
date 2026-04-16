package space.leafea.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController 
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") 
public class TestController {

    @GetMapping("/hello") 
    public String sayHello() {
        return "Привіт від Spring Boot!";
    }
}