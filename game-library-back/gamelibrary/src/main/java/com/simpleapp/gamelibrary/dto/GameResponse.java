package com.simpleapp.gamelibrary.dto;

import com.simpleapp.gamelibrary.entity.Game;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class GameResponse {
        private Long id;
        private String title;
        private String genre;
        private String platform;
        private LocalDate releaseDate;
        private String description;
        private String imageUrl;
        private Long userId;

    public GameResponse(Game game) {
        this.id = game.getId();
        this.title = game.getTitle();
        this.genre = game.getGenre();
        this.platform = game.getPlatform();
        this.releaseDate = game.getReleaseDate();
        this.description = game.getDescription();
        this.imageUrl = game.getImageUrl();
        this.userId = game.getUser().getId();
    }
}
