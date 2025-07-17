package com.simpleapp.gamelibrary.service;

import com.simpleapp.gamelibrary.dto.UpdateGameRequest;
import com.simpleapp.gamelibrary.entity.Game;
import com.simpleapp.gamelibrary.entity.User;
import com.simpleapp.gamelibrary.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;

    public List<Game> getAllGames(User user) {
        return gameRepository.findAllByUser(user);
    }
    public Game getGameByIdAndUser(Long id, User user) {
        return gameRepository.findById(id)
                .filter(game -> game.getUser().equals(user))
                .orElseThrow(() -> new IllegalArgumentException("Game not found"));
    }
    public Game saveGameForUser(Game game, User user) {
        game.setUser(user);
        return gameRepository.save(game);
    }

    public Game updateGameInfo(Long id, UpdateGameRequest updateGameRequest, User user) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Game not found"));

        if (!game.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Not authorized to update this game");
        }

        game.setTitle(updateGameRequest.getTitle());
        game.setGenre(updateGameRequest.getGenre());
        game.setPlatform(updateGameRequest.getPlatform());
        game.setReleaseDate(updateGameRequest.getReleaseDate());
        game.setDescription(updateGameRequest.getDescription());
        game.setImageUrl(updateGameRequest.getImageUrl());

        return gameRepository.save(game);
    }
    public void deleteGameById(Long gameId, User user) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new IllegalArgumentException("Game not found"));

        if (!game.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("You are not authorized to delete this game");
        }

        gameRepository.delete(game);
    }


}
