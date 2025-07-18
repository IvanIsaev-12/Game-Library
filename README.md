Game Library App
A full-stack web application for managing a personal video game library. Users can register, log in, and manage their game collection — including adding, updating, and deleting games.

🔧 Technologies Used
Backend (Java + Spring Boot)
Spring Boot

Spring Security with JWT Authentication

Spring Data JPA + Hibernate

PostgreSQL

Lombok

Frontend (React)


🧩 Features
✅ Authentication
User registration and login

JWT-based authentication

Passwords securely hashed with BCrypt

🎮 Game Management
Add a new game to your library

Edit game information

Delete games

View all games in your personal library

📦 Project Structure

/game-library-back
  └── src/main/java/com/simpleapp/gamelibrary/
      ├── controller
      ├── entity
      ├── service
      ├── repository
      └── config

/game-library-front
  └── src/
      ├── components
      ├── pages
      ├── contexts
      └── util
🚀 Getting Started
Prerequisites
Node.js (v18+)

PostgreSQL

Java 21

Maven

Setup Instructions

1. Backend
cd game-library-back
# Configure DB in application.properties
./mvnw spring-boot:run
⚠️ Don't forget to create your PostgreSQL database and set credentials in application.properties.

2. Frontend
cd game-library-front
npm install
npm run dev

🔐 Environment Variables
Backend (application.properties)
properties

spring.datasource.url=jdbc:postgresql://localhost:5432/gamelibrary
spring.datasource.username=your_username
spring.datasource.password=your_password
jwt.secret=your_jwt_secret

Frontend libraries used:
Material UI: https://mui.com/ (UI elements, Lab elements, Icons)
Tanstack query: https://tanstack.com/query/latest
React router, hook form

📮 API Endpoints
Auth
POST /api/auth/register – Register new user

POST /api/auth/login – Login and get JWT token

Games (Authorized)
GET /api/games/my-library – Get all games for logged-in user

GET /api/games/my-library/{id} – Get game by ID

POST /api/games/my-library – Add new game

PUT /api/games/my-library/{id} – Update game

DELETE /api/games/my-library/{id} – Delete game

✨ Contributors
👨‍💻 Backend – Ivan Isaev

💻 Frontend – Balázs Dézsenyi


