package space.leafea.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.client.RestTemplate;

@Configuration
@EnableScheduling
public class KeepAliveConfig {

    @Scheduled(fixedRate = 840000)
    public void pingRender() {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = "https://leafea-backend.onrender.com";
            restTemplate.getForObject(url, String.class);
            System.out.println("Ping! Render, не спати! 🦾");
        } catch (Exception e) {
        }
    }
}