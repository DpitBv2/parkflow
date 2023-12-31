package com.example.parkflow.Controller;

import com.example.parkflow.Controller.DTO.UserDTO;
import com.example.parkflow.Domain.Authority;
import com.example.parkflow.Domain.Reservation;
import com.example.parkflow.Domain.User;
import com.example.parkflow.Security.AuthenticationUtils;
import com.example.parkflow.Service.UserService;
import com.example.parkflow.Utils.ResponseException;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    private record RegisterBody(
            String firstName,
            String lastName,
            String email,
            String password,
            String phoneNumber
    ) {
    }

    private final UserService userService;
    private final AuthenticationUtils authenticationUtils;

    @Autowired
    public UserController(
            UserService userService,
            AuthenticationUtils authenticationUtils
    ) {
        this.userService = userService;
        this.authenticationUtils = authenticationUtils;
    }

    /**
     * {@code GET /api/v1/user} : Gets the user details of the current user
     *
     * @return user's details with status {@code 200 (OK)}
     */
    @GetMapping(
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    public ResponseEntity<?> getUserDetails() {
        try {
            return ResponseEntity.ok(
                    new UserDTO(authenticationUtils.getAuthentication())
            );
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code GET /api/v1/user/{email}} : Gets the user details of the user with the given email
     *
     * @param email : user's email
     * @return user's details with status {@code 200 (OK)}
     */
    @GetMapping(
            path = "/{email}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getUserDetails(@PathVariable String email) {
        try {
            return ResponseEntity.ok(new UserDTO(userService.get(email)));
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code PUT /api/v1/user} : Updates the user details of the current user
     *
     * @param userDTO : the user's new details
     * @return status {@code 200 (OK)} if the details are updated, status {@code 400 (BAD REQUEST)} if the given data is bad
     */
    @PutMapping(
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    public ResponseEntity<?> updateUser(
            @RequestBody UserDTO userDTO
    ) {
        try {
            var currentUser = authenticationUtils.getAuthentication();
            currentUser.setEmail(userDTO.getEmail());
            currentUser.setFirstName(userDTO.getFirstName());
            currentUser.setLastName(userDTO.getLastName());
            currentUser.setPhoneNumber(userDTO.getPhoneNumber());
            userService.update(currentUser);
            return ResponseEntity.ok().build();
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code POST /api/v1/user/register} : Registers a new user
     *
     * @param registerBody - the object containing user's data
     * @return {@code 200 (OK)} if the credentials are valid, else {@code 400 (BAD REQUEST)}
     */
    @PostMapping(
            path = "/register",
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    public ResponseEntity<?> register(@RequestBody RegisterBody registerBody) {
        try {
            Set<Authority> authorities = new HashSet<>();
            authorities.add(userService.getAuthority());
            userService.create(
                    registerBody.firstName,
                    registerBody.lastName,
                    registerBody.email,
                    registerBody.password,
                    registerBody.phoneNumber,
                    authorities
            );
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
        return ResponseEntity.ok().build();
    }


    @PutMapping("/role")
    public ResponseEntity<String> changeUserRoleByEmail(
            @RequestParam String email,
            @RequestParam String newRole
    ) {
        try {
            userService.changeUserRoleByEmail(email, newRole);
            return ResponseEntity.ok("User role updated successfully.");
        } catch (ResponseException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * {@code GET /api/v1/user/role} : Get user role by email
     * @return status {@code 200 (OK)} and body {@link String}
     */
    @GetMapping("/role")
    public ResponseEntity<String> getUserRole(Authentication authentication) {
        try {
            User user = userService.get((String) authentication.getPrincipal());
            return ResponseEntity.ok(userService.getUserRoleByEmail(user.getEmail()));
        } catch (ResponseException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * {@code GET /api/v1/user/reservations/{userId}} : Get reservations made by a user
     * @return status {@code 200 (OK)} and body {@link List<Reservation>}
     */
    @GetMapping("/reservations")
    public ResponseEntity<?> getUserReservations(Authentication authentication, @RequestParam(value = "page", defaultValue = "0") int page) {
        try {
            User user = userService.get((String) authentication.getPrincipal());
            List<Reservation> userReservations = userService.getUserReservations(user.getId(), page);
            return ResponseEntity.ok(userReservations);
        } catch (ResponseException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * {@code GET /api/v1/user/reservations/count} : Get reservations count made by a user
     * @param authentication - the user's authentication
     * @return status {@code 200 (OK)} and body {@link Integer}
     */
    @GetMapping("reservations/count")
    public ResponseEntity<?> getUserReservationsCount(Authentication authentication) {
        try {
            User user = userService.get((String) authentication.getPrincipal());
            return ResponseEntity.ok(userService.getUserReservationsCount(user.getId()));
        } catch (ResponseException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/reservations/cost")
    public ResponseEntity<?> getUserReservationsCost(Authentication authentication) {
        try {
            User user = userService.get((String) authentication.getPrincipal());
            return ResponseEntity.ok(userService.getUserReservationsCost(user.getId()));
        } catch (ResponseException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/sensors")
    public ResponseEntity<?> getUserSensors(Authentication authentication, @RequestParam(value = "page", defaultValue = "0") int page) {
        try {
            User user = userService.get((String) authentication.getPrincipal());
            return ResponseEntity.ok(userService.getUserSensors(user.getId(), page));
        } catch (ResponseException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/sensors/count")
    public ResponseEntity<?> getUserSensorsCount(Authentication authentication) {
        try {
            User user = userService.get((String) authentication.getPrincipal());
            return ResponseEntity.ok(userService.getUserSensorsCount(user.getId()));
        } catch (ResponseException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/hubs")
    public ResponseEntity<?> getUserHubs(Authentication authentication, @RequestParam(value = "page", defaultValue = "0") int page) {
        try {
            User user = userService.get((String) authentication.getPrincipal());
            return ResponseEntity.ok(userService.getUserHubs(user.getId(), page));
        } catch (ResponseException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/hubs/count")
    public ResponseEntity<?> getUserHubsCount(Authentication authentication) {
        try {
            User user = userService.get((String) authentication.getPrincipal());
            return ResponseEntity.ok(userService.getUserHubsCount(user.getId()));
        } catch (ResponseException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/reservedSensor")
    public ResponseEntity<?> getUserReservedSensor(Authentication authentication) {
        try {
            User user = userService.get((String) authentication.getPrincipal());
            return ResponseEntity.ok(userService.getUserReservedSensor(user.getId()));
        } catch (ResponseException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/notSetUpSensors")
    public ResponseEntity<?> getUserNotSetUpSensors(Authentication authentication) {
        try {
            User user = userService.get((String) authentication.getPrincipal());
            return ResponseEntity.ok(userService.getUserSensorsNotSetUpIDs(user.getId()));
        } catch (ResponseException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/notSetUpHubs")
    public ResponseEntity<?> getUserNotSetUpHubs(Authentication authentication) {
        try {
            User user = userService.get((String) authentication.getPrincipal());
            return ResponseEntity.ok(userService.getUserHubsNotSetUpIDs(user.getId()));
        } catch (ResponseException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/notSetUpSensors/count")
    public ResponseEntity<?> getUserNotSetUpSensorsCount(Authentication authentication) {
        try {
            User user = userService.get((String) authentication.getPrincipal());
            return ResponseEntity.ok(userService.getUserSensorsNotSetUpIDs(user.getId()).size());
        } catch (ResponseException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/notSetUpHubs/count")
    public ResponseEntity<?> getUserNotSetUpHubsCount(Authentication authentication) {
        try {
            User user = userService.get((String) authentication.getPrincipal());
            return ResponseEntity.ok(userService.getUserHubsNotSetUpIDs(user.getId()).size());
        } catch (ResponseException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}