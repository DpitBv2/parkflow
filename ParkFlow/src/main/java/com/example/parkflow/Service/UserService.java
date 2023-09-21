package com.example.parkflow.Service;

import com.example.parkflow.Domain.Authority;
import com.example.parkflow.Domain.Reservation;
import com.example.parkflow.Domain.User;
import com.example.parkflow.Utils.ResponseException;

import java.util.List;
import java.util.Set;

public interface UserService {
    void create(
            String firstName,
            String lastName,
            String email,
            String password,
            String phoneNumber,
            Set<Authority> authorities
    );

    boolean exists(String email);

    User get(Long id);
    User get(String email);

    void update(User user);

    Authority getAuthority();

    void changeUserRoleByEmail(String email, String newRole) throws ResponseException;

    String getUserRoleByEmail(String email) throws ResponseException;

    List<Reservation> getUserReservations(Long userId, int page);
}
