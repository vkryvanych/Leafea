package space.leafea.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "recommendations")
public class MediaItem {

    @Id
    private String id;
    private String userId;
    private String title;
    private String image;
    private String category;
    private String creator;
    private String genres;
    private String status;

    private int totalAmount;
    private int currentProgress;

    private String rating;
    private String review;
    private String startDate;

    private List<Quote> quotes = new ArrayList<>();

    public MediaItem() {
    }

    public String getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public String getTitle() {
        return title;
    }

    public String getImage() {
        return image;
    }

    public String getCategory() {
        return category;
    }

    public String getCreator() {
        return creator;
    }

    public String getGenres() {
        return genres;
    }

    public String getStatus() {
        return status;
    }

    public int getTotalAmount() {
        return totalAmount;
    }

    public int getCurrentProgress() {
        return currentProgress;
    }

    public String getRating() {
        return rating;
    }

    public String getReview() {
        return review;
    }

    public String getStartDate() {
        return startDate;
    }

    public List<Quote> getQuotes() {
        return quotes;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public void setGenres(String genres) {
        this.genres = genres;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setTotalAmount(int totalAmount) {
        this.totalAmount = totalAmount;
    }

    public void setCurrentProgress(int currentProgress) {
        this.currentProgress = currentProgress;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public void setQuotes(List<Quote> quotes) {
        this.quotes = quotes;
    }
}