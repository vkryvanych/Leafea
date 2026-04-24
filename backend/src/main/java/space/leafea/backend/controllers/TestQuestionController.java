package space.leafea.backend.controllers;

import org.springframework.web.bind.annotation.*;
import space.leafea.backend.models.TestQuestion;
import space.leafea.backend.repositories.TestQuestionRepository;
import java.util.List;

@RestController
@RequestMapping("/api/test-questions")
@CrossOrigin(origins = "http://localhost:5173")
public class TestQuestionController {

    private final TestQuestionRepository repository;

    public TestQuestionController(TestQuestionRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/{category}")
    public List<TestQuestion> getQuestionsByCategory(@PathVariable String category) {
        return repository.findByCategory(category);
    }
}