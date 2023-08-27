package com.example.parkflow.Security;

import com.example.parkflow.Service.UserService;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class AuthenticationFilter implements Filter {
    private final UserService userService;

    @Autowired
    public AuthenticationFilter(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void doFilter(
            ServletRequest request,
            ServletResponse response,
            FilterChain filterChain
    ) throws IOException, ServletException {
        doFilter((HttpServletRequest) request);
        filterChain.doFilter(request, response);
    }

    public void doFilter(HttpServletRequest request) {
        var token = request.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer "))
            return;
        token = token.split(" ")[1].trim();
        try {
            var userDetails = JWTGenerator.decodeToken(token);
            if (!userService.exists(userDetails.getUsername()))
                return;
            SecurityContextHolder.getContext().setAuthentication(
                    new UsernamePasswordAuthenticationToken(
                            userDetails.getUsername(), null, userDetails.getAuthorities()
                    )
            );
        } catch (Exception ignored) { }
    }
}