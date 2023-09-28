package com.example.parkflow.Security;

import com.example.parkflow.Service.HubService;
import com.example.parkflow.Service.UserService;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collections;

@Component
public class AuthenticationFilter implements Filter {
    private final UserService userService;
    private final HubService hubService;

    @Autowired
    public AuthenticationFilter(UserService userService, HubService hubService) {
        this.userService = userService;
        this.hubService = hubService;
    }

    @Override
    public void doFilter(
            ServletRequest request,
            ServletResponse response,
            FilterChain filterChain
    ) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String authorizationHeader = httpRequest.getHeader("Authorization");

        if (authorizationHeader != null) {
            if (authorizationHeader.startsWith("Bearer ")) {
                // Extract the JWT token from the "Authorization" header
                String token = authorizationHeader.substring(7).trim();

                try {
                    // Decode and validate the JWT token
                    var userDetails = JWTGenerator.decodeToken(token);

                    // Check if the user exists in your system
                    if (userService.exists(userDetails.getUsername())) {
                        // Set user authentication details
                        SecurityContextHolder.getContext().setAuthentication(
                                new UsernamePasswordAuthenticationToken(
                                        userDetails.getUsername(), null, userDetails.getAuthorities()
                                )
                        );
                    }
                } catch (Exception ignored) {
                    // Handle token validation errors
                }
            } else if (authorizationHeader.startsWith("Hub-Token ")) {
                // Extract the hub token from the "Authorization" header
                String hubToken = authorizationHeader.substring(10).trim();

                // Check if the hub token is valid
                if (hubService.isValidHubToken(hubToken)) {
                    // Set hub authentication details
                    SecurityContextHolder.getContext().setAuthentication(
                            new UsernamePasswordAuthenticationToken(hubToken, null, Collections.emptyList())
                    );
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}