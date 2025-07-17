package com.simpleapp.gamelibrary.controller;


import com.simpleapp.gamelibrary.dto.GameResponse;
import com.simpleapp.gamelibrary.dto.UpdateGameRequest;
import com.simpleapp.gamelibrary.entity.Game;
import com.simpleapp.gamelibrary.entity.User;
import com.simpleapp.gamelibrary.service.GameService;
import com.simpleapp.gamelibrary.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;
    private final UserService userService;

    @GetMapping("/my-library")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<Game>> getAllGames() {
        User currentUser = userService.getCurrentUser();
        List<Game> games = gameService.getAllGames(currentUser);
        return ResponseEntity.ok(games);
    }

    @GetMapping("/my-library/{id}")
    public ResponseEntity<?> getGame(@PathVariable Long id) {
        try {
            User currentUser = userService.getCurrentUser();
            Game game = gameService.getGameByIdAndUser(id, currentUser);
            return ResponseEntity.ok(new GameResponse(game));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/my-library")
    public ResponseEntity<?> addGameToLibrary(@RequestBody Game game) {
        User currentUser = userService.getCurrentUser();
        Game savedGame = gameService.saveGameForUser(game, currentUser);
        return ResponseEntity.ok(savedGame);
    }
    @PutMapping("/my-library/{game_id}")
    public ResponseEntity<?> updateGame(@PathVariable Long game_id, @RequestBody UpdateGameRequest request) {
        try {
            User currentUser = userService.getCurrentUser();
            Game savedGame = gameService.updateGameInfo(game_id, request, currentUser);
            return ResponseEntity.ok(savedGame);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @DeleteMapping("/my-library/{id}")
    public ResponseEntity<?> deleteGame(@PathVariable Long id) {
        try {
            User currentUser = userService.getCurrentUser();
            gameService.deleteGameById(id, currentUser);
            return ResponseEntity.ok("Game deleted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }




}
