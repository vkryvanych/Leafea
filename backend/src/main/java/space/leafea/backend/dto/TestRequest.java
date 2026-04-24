package space.leafea.backend.dto;

import java.util.List;
import java.util.Map;

public class TestRequest {

    private String category; 

    private Map<String, List<String>> answers;

    public TestRequest() {
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Map<String, List<String>> getAnswers() {
        return answers;
    }

    public void setAnswers(Map<String, List<String>> answers) {
        this.answers = answers;
    }
}