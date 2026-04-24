package space.leafea.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Document(collection = "recommendation_items")
public class RecommendationItem {

    @Id
    private String id;

    private String title;
    private String description;
    private String backgroundImage;
    private int rating;

    private String bottomLeftLabel;
    private String bottomLeftText;
    private String galleryTitle;
    private List<String> galleryImages = new ArrayList<>();

    private List<Map<String, String>> details = new ArrayList<>();

    private String category; 
    private List<String> genres = new ArrayList<>();
    private String mood;
    private String duration;
    private String age;


    private List<String> preferences = new ArrayList<>(); 
    private String occasion; 
    private String viewingStyle;
    private String status; 
    private String setting; 
    private String region; 

    public RecommendationItem() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBackgroundImage() {
        return backgroundImage;
    }

    public void setBackgroundImage(String backgroundImage) {
        this.backgroundImage = backgroundImage;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getBottomLeftLabel() {
        return bottomLeftLabel;
    }

    public void setBottomLeftLabel(String bottomLeftLabel) {
        this.bottomLeftLabel = bottomLeftLabel;
    }

    public String getBottomLeftText() {
        return bottomLeftText;
    }

    public void setBottomLeftText(String bottomLeftText) {
        this.bottomLeftText = bottomLeftText;
    }

    public String getGalleryTitle() {
        return galleryTitle;
    }

    public void setGalleryTitle(String galleryTitle) {
        this.galleryTitle = galleryTitle;
    }

    public List<String> getGalleryImages() {
        return galleryImages;
    }

    public void setGalleryImages(List<String> galleryImages) {
        this.galleryImages = galleryImages;
    }

    public List<Map<String, String>> getDetails() {
        return details;
    }

    public void setDetails(List<Map<String, String>> details) {
        this.details = details;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<String> getGenres() {
        return genres;
    }

    public void setGenres(List<String> genres) {
        this.genres = genres;
    }

    public String getMood() {
        return mood;
    }

    public void setMood(String mood) {
        this.mood = mood;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public List<String> getPreferences() {
        return preferences;
    }

    public void setPreferences(List<String> preferences) {
        this.preferences = preferences;
    }

    public String getOccasion() {
        return occasion;
    }

    public void setOccasion(String occasion) {
        this.occasion = occasion;
    }

    public String getViewingStyle() {
        return viewingStyle;
    }

    public void setViewingStyle(String viewingStyle) {
        this.viewingStyle = viewingStyle;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSetting() {
        return setting;
    }

    public void setSetting(String setting) {
        this.setting = setting;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }
}