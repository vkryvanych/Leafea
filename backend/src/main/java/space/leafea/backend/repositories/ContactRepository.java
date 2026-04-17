package space.leafea.backend.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import space.leafea.backend.models.ContactMessage;

public interface ContactRepository extends MongoRepository<ContactMessage, String> {
}