package space.leafea.backend.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import space.leafea.backend.models.TestQuestion;
import java.util.List;

@Repository
public interface TestQuestionRepository extends MongoRepository<TestQuestion, String> {
    List<TestQuestion> findByCategory(String category);
} 