package space.leafea.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import space.leafea.backend.dto.TestRequest;
import space.leafea.backend.models.RecommendationItem;
import space.leafea.backend.services.RecommendationService;
import java.util.List;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "http://localhost:5173")
public class TestController {

    private final RecommendationService recommendationService;

    public TestController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @PostMapping("/match")
    public ResponseEntity<?> getRecommendationMatch(@RequestBody TestRequest request) {

        List<RecommendationItem> matches = recommendationService.findBestMatches(request);

        if (matches == null || matches.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(matches);
    }
}