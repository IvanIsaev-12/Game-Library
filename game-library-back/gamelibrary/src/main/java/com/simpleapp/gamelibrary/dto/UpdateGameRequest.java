package com.simpleapp.gamelibrary.dto;

import com.simpleapp.gamelibrary.entity.Game;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateGameRequest {
    private String title;
    private String genre;
    private String platform;
    private LocalDate releaseDate;
    private String description;
    private String imageUrl;
}
