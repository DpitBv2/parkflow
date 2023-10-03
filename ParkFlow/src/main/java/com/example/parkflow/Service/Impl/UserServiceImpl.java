package com.example.parkflow.Service.Impl;

import com.example.parkflow.Domain.*;
import com.example.parkflow.Repository.AuthorityRepository;
import com.example.parkflow.Repository.ReservationRepository;
import com.example.parkflow.Repository.SensorRepository;
import com.example.parkflow.Repository.UserRepository;
import com.example.parkflow.Security.PasswordEncoder;
import com.example.parkflow.Service.UserService;
import com.example.parkflow.Utils.Constants;
import com.example.parkflow.Utils.ResponseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final SensorRepository sensorRepository;
    private final PasswordEncoder passwordEncoder;
    private Authority userAuthority;
    private ReservationRepository reservationRepository;

    @Autowired
    public UserServiceImpl(
            UserRepository userRepository,
            AuthorityRepository authorityRepository,
            PasswordEncoder passwordEncoder,
            ReservationRepository reservationRepository,
            SensorRepository sensorRepository
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.reservationRepository = reservationRepository;
        this.sensorRepository = sensorRepository;

        authorityRepository.findByAuthority("user")
                .ifPresent(authority -> userAuthority = authority);
    }
    @Override
    public void create(
            String firstName,
            String lastName,
            String email,
            String password,
            String phoneNumber,
            Set<Authority> authorities
    ) {
        if (
                email.isEmpty() ||
                        firstName.isEmpty() ||
                        lastName.isEmpty())
            throw new ResponseException("Invalid data");
        if (userRepository.existsByEmail(email))
            throw new ResponseException("Email address is already used.");
        if (password.length() < 8)
            throw new ResponseException("Password should be longer then 8 characters.");
        var encodedPassword = passwordEncoder.encode(password);
        var user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPassword(encodedPassword);
        user.setPhoneNumber(phoneNumber);
        Authority userRole = new Authority("USER");
        user.getAuthorities().add(userRole);
        user.getAuthorities().addAll(authorities);
        userRepository.save(user);
    }

    @Override
    public boolean exists(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User get(Long id) {
        var user = userRepository.findById(id);
        if (user.isEmpty())
            throw new ResponseException("User not found.", HttpStatus.NOT_FOUND);
        return user.get();
    }

    @Override
    public User get(String email) {
        var user = userRepository.findByEmail(email);
        if (user.isEmpty())
            throw new ResponseException("User not found.", HttpStatus.NOT_FOUND);
        return user.get();
    }

    @Override
    public void update(User user) {
        if (
                user.getEmail().isEmpty() ||
                        user.getFirstName().isEmpty() ||
                        user.getLastName().isEmpty())
            throw new ResponseException("Invalid data");
        if (userRepository.existsByEmail(user.getEmail()) && !userRepository.findByEmail(user.getEmail()).get().getId().equals(user.getId()))
            throw new ResponseException("Email is already used.");
        userRepository.save(user);
    }

    @Override
    public Authority getAuthority() {
        return userAuthority;
    }

    @Override
    public void changeUserRoleByEmail(String email, String newRole) throws ResponseException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseException("User not found.", HttpStatus.NOT_FOUND));
        user.getAuthorities().removeIf(authority ->
                authority.getAuthority().equals("USER") ||
                authority.getAuthority().equals("ADMIN") ||
                authority.getAuthority().equals("CUSTOMER"));

        if (isValidRole(newRole)) {
            Authority newAuthority = new Authority(newRole);
            user.getAuthorities().add(newAuthority);
            userRepository.save(user);
        } else {
            throw new ResponseException("Invalid role: " + newRole, HttpStatus.BAD_REQUEST);
        }
    }

    private boolean isValidRole(String role) {
        List<String> validRoles = Arrays.asList("ADMIN","CUSTOMER","USER");
        return validRoles.contains(role);
    }
    @Override
    public String getUserRoleByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseException("User not found.", HttpStatus.NOT_FOUND));
        if (user.getAuthorities().stream().anyMatch(authority -> authority.getAuthority().equals("USER"))) {
            return "USER";
        } else if (user.getAuthorities().stream().anyMatch(authority -> authority.getAuthority().equals("ADMIN"))) {
            return "ADMIN";
        } else if (user.getAuthorities().stream().anyMatch(authority -> authority.getAuthority().equals("CUSTOMER"))) {
            return "CUSTOMER";
        } else {
            throw new ResponseException("User has no valid roles.", HttpStatus.BAD_REQUEST);
        }
    }
    @Override
    public List<Reservation> getUserReservations(Long userId, int page) {
        List<Reservation> reservationList = reservationRepository.findByUserId(userId);
        reservationList.sort(Comparator.comparing(Reservation::getId).reversed());
        return reservationList.subList(page * Constants.PAGE_SIZE, Math.min((page + 1) * Constants.PAGE_SIZE, reservationList.size()));
    }

    @Override
    public int getUserReservationsCount(Long userId) {
        List<Reservation> reservationList = reservationRepository.findByUserId(userId);
        return reservationList.size();
    }

    @Override
    public BigDecimal getUserReservationsCost(Long userId) {
        List<Reservation> reservationList = reservationRepository.findByUserId(userId);
        BigDecimal cost = BigDecimal.ZERO;
        for (Reservation reservation : reservationList) {
            cost = cost.add(reservation.getCost());
        }
        return cost;
    }

    @Override
    public Set<Sensor> getUserSensors(Long userId, int page) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseException("User not found.", HttpStatus.NOT_FOUND));
        var sensors = user.getOwnedSensors();
        sensors.removeIf(sensor -> sensor.getAddress() == null);
        return sensors.stream().skip((long) page * Constants.PAGE_SIZE).limit(Constants.PAGE_SIZE).collect(java.util.stream.Collectors.toSet());
    }

    @Override
    public Set<Hub> getUserHubs(Long userId, int page) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseException("User not found.", HttpStatus.NOT_FOUND));
        var hubs = user.getOwnedHubs();
        hubs.removeIf(hub -> hub.getLatitude() == 0 && hub.getLongitude() == 0);
        return hubs.stream().skip((long) page * Constants.PAGE_SIZE).limit(Constants.PAGE_SIZE).collect(java.util.stream.Collectors.toSet());
    }

    @Override
    public int getUserSensorsCount(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseException("User not found.", HttpStatus.NOT_FOUND));
        return user.getOwnedSensors().size();
    }

    @Override
    public int getUserHubsCount(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseException("User not found.", HttpStatus.NOT_FOUND));
        return user.getOwnedHubs().size();
    }

    @Override
    public Sensor getUserReservedSensor(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseException("User not found.", HttpStatus.NOT_FOUND));
        Sensor sensor = sensorRepository.findById(user.getReservedSensorId())
                .orElseThrow(() -> new ResponseException("Sensor not found.", HttpStatus.NOT_FOUND));
        return sensor;
    }

    @Override
    public Set<Long> getUserSensorsNotSetUpIDs(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseException("User not found.", HttpStatus.NOT_FOUND));
        Set<Sensor> userSensors = user.getOwnedSensors();
        userSensors.removeIf(sensor -> sensor.getAddress() != null);
        return userSensors.stream().map(Sensor::getId).collect(java.util.stream.Collectors.toSet());
    }

    @Override
    public Set<Long> getUserHubsNotSetUpIDs(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseException("User not found.", HttpStatus.NOT_FOUND));
        Set<Hub> userHubs = user.getOwnedHubs();
        userHubs.removeIf(hub -> hub.getLatitude() != 0 && hub.getLongitude() != 0);
        return userHubs.stream().map(Hub::getId).collect(java.util.stream.Collectors.toSet());
    }
}