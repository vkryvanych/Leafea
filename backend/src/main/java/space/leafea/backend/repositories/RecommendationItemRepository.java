package space.leafea.backend.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import space.leafea.backend.models.RecommendationItem;
import java.util.List;

@Repository
public interface RecommendationItemRepository extends MongoRepository<RecommendationItem, String> {
    List<RecommendationItem> findByCategory(String category);
}