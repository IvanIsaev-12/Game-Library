package com.simpleapp.gamelibrary.controller;


import com.simpleapp.gamelibrary.entity.Game;
import com.simpleapp.gamelibrary.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @GetMapping()
    public ResponseEntity<List<Game>> getGames() {
        System.out.println("GET /api/games called");
        List<Game> games = gameService.getAllGames();
        System.out.println("Fetched games: " + games.size());
        return ResponseEntity.ok(games);
    }



}
