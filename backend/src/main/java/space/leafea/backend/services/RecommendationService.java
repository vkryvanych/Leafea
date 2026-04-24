package space.leafea.backend.services;

import org.springframework.stereotype.Service;
import space.leafea.backend.dto.TestRequest;
import space.leafea.backend.models.RecommendationItem;
import space.leafea.backend.repositories.RecommendationItemRepository;

import java.util.List;
import java.util.Map;

@Service
public class RecommendationService {

    private final RecommendationItemRepository repository;

    public RecommendationService(RecommendationItemRepository repository) {
        this.repository = repository;
    }

    public RecommendationItem findBestMatch(TestRequest request) {
        List<RecommendationItem> allItems = repository.findByCategory(request.getCategory());

        if (allItems == null || allItems.isEmpty()) {
            return null;
        }

        RecommendationItem bestMatch = null;
        int highestScore = 0;

        Map<String, List<String>> userAnswers = request.getAnswers();

        List<String> wantedGenres = userAnswers.get("genres");
        String wantedMood = getSingleAnswer(userAnswers, "mood");

        String wantedDuration = getSingleAnswer(userAnswers, "duration");
        if (wantedDuration == null)
            wantedDuration = getSingleAnswer(userAnswers, "format");
        if (wantedDuration == null)
            wantedDuration = getSingleAnswer(userAnswers, "length");

        String wantedAge = getSingleAnswer(userAnswers, "age");
        if (wantedAge == null)
            wantedAge = getSingleAnswer(userAnswers, "art_style");
        if (wantedAge == null)
            wantedAge = getSingleAnswer(userAnswers, "era");

        List<String> wantedPreferences = userAnswers.get("preferences");
        if (wantedPreferences == null)
            wantedPreferences = userAnswers.get("key_elements");

        String wantedOccasion = getSingleAnswer(userAnswers, "occasion");
        String wantedViewingStyle = getSingleAnswer(userAnswers, "viewing_style");
        String wantedStatus = getSingleAnswer(userAnswers, "status");
        String wantedSetting = getSingleAnswer(userAnswers, "setting");
        String wantedRegion = getSingleAnswer(userAnswers, "region");

        for (RecommendationItem item : allItems) {

            if (wantedGenres != null && !wantedGenres.isEmpty()) {
                boolean hasMatchingGenre = false;

                if (item.getGenres() != null) {
                    for (String wGenre : wantedGenres) {
                        if (item.getGenres().contains(wGenre)) {
                            hasMatchingGenre = true;
                            break;
                        }
                    }
                }

                if (!hasMatchingGenre) {
                    continue;
                }
            }

            int currentScore = 0;

            if (wantedGenres != null && item.getGenres() != null) {
                for (String genre : wantedGenres) {
                    if (item.getGenres().contains(genre))
                        currentScore += 5;
                }
            }

            if (wantedMood != null && wantedMood.equals(item.getMood()))
                currentScore += 10;

            if (wantedDuration != null && wantedDuration.equals(item.getDuration()))
                currentScore += 5;

            if (wantedAge != null && wantedAge.equals(item.getAge()))
                currentScore += 3;

            if (wantedOccasion != null && wantedOccasion.equals(item.getOccasion()))
                currentScore += 3;
            if (wantedViewingStyle != null && wantedViewingStyle.equals(item.getViewingStyle()))
                currentScore += 3;
            if (wantedStatus != null && wantedStatus.equals(item.getStatus()))
                currentScore += 3;
            if (wantedSetting != null && wantedSetting.equals(item.getSetting()))
                currentScore += 3;
            if (wantedRegion != null && wantedRegion.equals(item.getRegion()))
                currentScore += 3;

            if (wantedPreferences != null && item.getPreferences() != null) {
                for (String pref : wantedPreferences) {
                    if (item.getPreferences().contains(pref))
                        currentScore += 1;
                }
            }

            if (currentScore > highestScore) {
                highestScore = currentScore;
                bestMatch = item;
            }
        }

        return bestMatch;
    }

    private String getSingleAnswer(Map<String, List<String>> answers, String key) {
        if (answers != null && answers.containsKey(key) && !answers.get(key).isEmpty()) {
            return answers.get(key).get(0);
        }
        return null;
    }
}