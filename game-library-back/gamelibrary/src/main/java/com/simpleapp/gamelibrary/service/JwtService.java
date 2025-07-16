package com.simpleapp.gamelibrary.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET_KEY = "AAkCaB7gL4FylImd30dJcfKzN/0+zLtbqMNV4KsXflBsvF+OK0cnJzknBKBStNjaAl+Bg99ZZP5oLKyW77ZCReYYVlNnlq5XoCyY5eT4XI+hTCYSVfwpjAR3Ugm3mlziIMK5yzkwjG6gy3VxzXOk1f4e9Hhr7Z7YwaLUB/kosNi1RLyWZ32ef7lOtyRHtPLsrkyoPd6EmbvJPz+4xNlIUZVgvrr7SeRViT4Immp0dA+jjWjbl2HQU/ylqHtlPud24bnsuumBqI7mxnuGd53NpqG3FphUAdD9d8dww0gIyWg3Q6Eg6LhEyhSaVvQUN7GtbJSAJW4IgFiow+xeESi7uFnhv0NnycBHI3cXc/fkG3Y=\n";

    public String extractUsername(String token) {
        return  extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {

        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60  * 24))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    private Claims extractClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
