package com.simpleapp.gamelibrary.entity;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Getter
    @Column(name = "first_name")
    private String firstName;

    @Setter
    @Getter
    @Column(name = "last_name")
    private String lastName;

    @Setter
    @Getter
    @Column(name = "password")
    private String password;

    @Setter
    @Getter
    @Column(name = "email")
    private String email;

    public User() {

    }
}
