package com.example.parkflow.Security;

import com.example.parkflow.Domain.User;
import com.example.parkflow.Service.UserService;
import com.example.parkflow.Utils.ResponseException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationUtils {
    private final UserService userService;

    public AuthenticationUtils(UserService userService) {
        this.userService = userService;
    }

    public boolean isAuthenticated() {
        return SecurityContextHolder.getContext().getAuthentication().isAuthenticated();
    }

    public User getAuthentication() {
        final var username = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
        try {
            return userService.get(username);
        } catch (Exception ignored) {
            throw new ResponseException("Unauthenticated", HttpStatus.UNAUTHORIZED);
        }
    }
}