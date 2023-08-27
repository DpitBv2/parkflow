package com.example.parkflow.Controller;

import com.example.parkflow.Security.JWTGenerator;
import com.example.parkflow.Security.PasswordEncoder;
import com.example.parkflow.Service.UserService;
import com.example.parkflow.Utils.ResponseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    private record LoginBody(String username, String password) {}
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthenticationController(
            UserService userService,
            PasswordEncoder passwordEncoder
    ) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * {@code POST /api/v1/auth/login} : Logins an existing user.
     * @param credentials - the object containing the user's credentials
     * @return the {@link String} JWT with status {@code 200 (OK)} if the credentials are correct, else {@code 400 (BAD REQUEST)}
     */
    @PostMapping(
            path = "/login",
            consumes = { MediaType.APPLICATION_JSON_VALUE },
            produces = { MediaType.TEXT_PLAIN_VALUE }
    )
    public ResponseEntity<?> login(@RequestBody LoginBody credentials) {
        try {
            var user = userService.get(credentials.username);
            if (!passwordEncoder.matches(credentials.password, user.getPassword()))
                return ResponseEntity.badRequest().build();
            return ResponseEntity.ok(JWTGenerator.encodeToken(user));
        } catch (ResponseException e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
