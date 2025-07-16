package com.simpleapp.gamelibrary.repository;

import com.simpleapp.gamelibrary.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GameRepository extends JpaRepository<Game, Long> {
    Optional<Game> findById(Long id);
    List<Game> findAllByUserId(Long id);

}
