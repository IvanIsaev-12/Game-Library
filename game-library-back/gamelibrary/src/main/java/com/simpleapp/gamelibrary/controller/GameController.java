package com.simpleapp.gamelibrary.controller;


import com.simpleapp.gamelibrary.entity.Game;
import com.simpleapp.gamelibrary.entity.User;
import com.simpleapp.gamelibrary.service.GameService;
import com.simpleapp.gamelibrary.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;
    private final UserService userService;

    @GetMapping("/my-library")
    public ResponseEntity<List<Game>> getGames() {
        User currentUser = userService.getCurrentUser();
        List<Game> games = gameService.getAllGames(currentUser);
        return ResponseEntity.ok(games);
    }



}
