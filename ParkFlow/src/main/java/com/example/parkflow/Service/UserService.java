package com.example.parkflow.Service;

import com.example.parkflow.Domain.*;
import com.example.parkflow.Utils.ResponseException;

import java.math.BigDecimal;
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

    int getUserReservationsCount(Long userId);

    BigDecimal getUserReservationsCost(Long userId);

    Set<Sensor> getUserSensors(Long userId);

    Set<Hub> getUserHubs(Long userId);

    int getUserSensorsCount(Long userId);

    int getUserHubsCount(Long userId);

    Sensor getUserReservedSensor(Long userId);

    Set<Long> getUserSensorsNotSetUpIDs(Long userId);

    Set<Long> getUserHubsNotSetUpIDs(Long userId);
}
