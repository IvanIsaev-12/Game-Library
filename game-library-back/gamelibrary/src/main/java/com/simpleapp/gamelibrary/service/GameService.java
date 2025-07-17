package com.simpleapp.gamelibrary.service;

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

}
