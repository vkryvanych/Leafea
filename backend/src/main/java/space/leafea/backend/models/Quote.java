package space.leafea.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Quote {
    private String id;
    private String text;

    @JsonProperty("isFavorite")
    private boolean isFavorite;

    public Quote() {
    }

    public Quote(String id, String text, boolean isFavorite) {
        this.id = id;
        this.text = text;
        this.isFavorite = isFavorite;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @JsonProperty("isFavorite")
    public boolean isFavorite() {
        return isFavorite;
    }

    public void setFavorite(boolean favorite) {
        isFavorite = favorite;
    }
}