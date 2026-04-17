package space.leafea.backend.controllers;

import org.springframework.web.bind.annotation.*;
import space.leafea.backend.models.ContactMessage;
import space.leafea.backend.repositories.ContactRepository;
import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    private final ContactRepository contactRepository;

    public ContactController(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @PostMapping("/send")
    public ContactMessage sendMessage(@RequestBody ContactMessage message) {
        System.out.println("Отримано повідомлення від: " + message.getName());
        return contactRepository.save(message);
    }

    @GetMapping("/all")
    public List<ContactMessage> getAllMessages() {
        return contactRepository.findAll();
    }
}