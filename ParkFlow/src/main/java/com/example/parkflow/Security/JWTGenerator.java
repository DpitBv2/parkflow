package com.example.parkflow.Security;

import com.example.parkflow.Domain.Authority;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.stream.Collectors;

public class JWTGenerator {
    private static final String SECRET = "vinoaicidecestaivinosinupleca";
    private static final Algorithm algorithm = Algorithm.HMAC256(SECRET);

    public static String encodeToken(UserDetails userDetails) throws JWTCreationException {
        // converting user details into a string
        String username = userDetails.getUsername();
        String authorities = userDetails
                .getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .filter(authority -> authority.length() > 0)
                .collect(Collectors.joining(";"));
        return JWT.create()
                .withClaim("username", username)
                .withClaim("authorities", authorities)
                .sign(algorithm);
    }

    public static UserDetails decodeToken(String token) throws JWTVerificationException {
        final var jwt = JWT.decode(token);
        var username = jwt.getClaim("username").toString();
        username = username.substring(1, username.length() - 1);
        var authorities = Arrays.stream(
                        jwt.getClaim("authorities").toString().split(";")
                )
                .filter(authority -> authority.length() > 0)
                .map(authority -> new Authority(authority.substring(1, authority.length() - 1)))
                .toList();
        return new User(username, "", authorities);
    }
}
