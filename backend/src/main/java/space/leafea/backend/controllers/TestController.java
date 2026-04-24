package space.leafea.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import space.leafea.backend.dto.TestRequest;
import space.leafea.backend.models.RecommendationItem;
import space.leafea.backend.services.RecommendationService;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "http://localhost:5173")
public class TestController {

    private final RecommendationService recommendationService;

    public TestController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @PostMapping("/match")
    public ResponseEntity<RecommendationItem> getRecommendationMatch(@RequestBody TestRequest request) {
        RecommendationItem bestMatch = recommendationService.findBestMatch(request);

        if (bestMatch == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(bestMatch);
    }
}