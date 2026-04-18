package space.leafea.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import space.leafea.backend.models.MediaItem;
import space.leafea.backend.models.User;
import space.leafea.backend.repositories.MediaItemRepository;
import space.leafea.backend.repositories.UserRepository;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cabinet")
@CrossOrigin(origins = "http://localhost:5173")
public class CabinetController {

    private final MediaItemRepository mediaItemRepository;
    private final UserRepository userRepository;

    public CabinetController(MediaItemRepository mediaItemRepository, UserRepository userRepository) {
        this.mediaItemRepository = mediaItemRepository;
        this.userRepository = userRepository;
    }

    private String getUserId(Principal principal) {
        if (principal == null)
            return null;
        Optional<User> user = userRepository.findByEmail(principal.getName());
        return user.map(User::getId).orElse(null);
    }

    // READ
    @GetMapping
    public ResponseEntity<List<MediaItem>> getMyItems(Principal principal) {
        String userId = getUserId(principal);
        if (userId == null)
            return ResponseEntity.status(401).build();

        List<MediaItem> items = mediaItemRepository.findByUserIdOrderByIdDesc(userId);
        return ResponseEntity.ok(items);
    }

    // CREATE
    @PostMapping
    public ResponseEntity<MediaItem> addItem(@RequestBody MediaItem item, Principal principal) {
        String userId = getUserId(principal);
        if (userId == null)
            return ResponseEntity.status(401).build();

        item.setUserId(userId);
        MediaItem savedItem = mediaItemRepository.save(item);
        return ResponseEntity.ok(savedItem);
    }

    // UPDATE: (прогрес, статус або додати цитату)
    @PutMapping("/{id}")
    public ResponseEntity<MediaItem> updateItem(@PathVariable String id, @RequestBody MediaItem updatedItem,
            Principal principal) {
        String userId = getUserId(principal);
        if (userId == null)
            return ResponseEntity.status(401).build();

        return mediaItemRepository.findById(id).map(existingItem -> {
            if (!existingItem.getUserId().equals(userId)) {
                return ResponseEntity.status(403).<MediaItem>build();
            }

            updatedItem.setId(id);
            updatedItem.setUserId(userId);
            MediaItem savedItem = mediaItemRepository.save(updatedItem);
            return ResponseEntity.ok(savedItem);
        }).orElse(ResponseEntity.notFound().build());
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable String id, Principal principal) {
        String userId = getUserId(principal);
        if (userId == null)
            return ResponseEntity.status(401).build();

        return mediaItemRepository.findById(id).map(item -> {
            if (!item.getUserId().equals(userId)) {
                return ResponseEntity.status(403).build();
            }
            mediaItemRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}