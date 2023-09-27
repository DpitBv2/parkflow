package com.example.parkflow.Service.Impl;

import com.example.parkflow.Domain.Address;
import com.example.parkflow.Domain.Sensor;
import com.example.parkflow.Domain.Reservation;
import com.example.parkflow.Domain.User;
import com.example.parkflow.Repository.HubRepository;
import com.example.parkflow.Repository.ReservationRepository;
import com.example.parkflow.Repository.SensorRepository;
import com.example.parkflow.Repository.UserRepository;
import com.example.parkflow.Service.SensorService;
import com.example.parkflow.Utils.Constants;
import com.example.parkflow.Utils.ResponseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import java.time.LocalDateTime;

@Service
public class SensorServiceImpl implements SensorService {
    private final SensorRepository sensorRepository;
    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;
    private final HubRepository hubRepository;

    @Autowired
    public SensorServiceImpl(SensorRepository sensorRepository, UserRepository userRepository, ReservationRepository reservationRepository, HubRepository hubRepository) {
        this.sensorRepository = sensorRepository;
        this.userRepository = userRepository;
        this.reservationRepository = reservationRepository;
        this.hubRepository = hubRepository;
    }

    public boolean isSensorOwnedByUser(Long sensorId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.toString()).orElse(null);
        try {
            if (user != null) {
                Optional<Sensor> sensorOptional = sensorRepository.findById(sensorId);
                if (sensorOptional.isPresent()) {
                    Sensor sensor = sensorOptional.get();
                    System.out.println(sensor.getOwner());
                    return sensor.getOwner().equals(user);
                }
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }
    private void authorizeCustomerOrAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            Object principal = authentication.getPrincipal();
            System.out.println("Principal: " + principal);
            if (principal != null) {
                User user = userRepository.findByEmail(principal.toString()).orElse(null);
                System.out.println("User: " + user.getUsername() + " has authorities: " + user.getAuthorities());
                if (user.getAuthorities().stream()
                        .anyMatch(authority -> authority.getAuthority().equals("CUSTOMER") || authority.getAuthority().equals("ADMIN"))) {
                    return;
                }
            }
        }
        throw new ResponseException("Access denied. You must have CUSTOMER or ADMIN role.", HttpStatus.FORBIDDEN);
    }
    @Override
    public void updatePricePerHour(Long sensorId, BigDecimal pricePerHour) {
        authorizeCustomerOrAdmin();
        Optional<Sensor> sensorOptional = sensorRepository.findById(sensorId);
        if (sensorOptional.isPresent()) {
            Sensor sensor = sensorOptional.get();
            sensor.setReservationPricePerHour(pricePerHour);
            sensorRepository.save(sensor);
        } else {
            throw new ResponseException("Sensor not found.", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public Sensor create(double latitude, double longitude, Address address, Boolean isPrivate) {
        authorizeCustomerOrAdmin();
        var sensor = new Sensor(latitude, longitude, address, isPrivate);
        return sensorRepository.save(sensor);
    }

    @Override
    public Sensor getById(Long id) {
        return sensorRepository.findById(id).orElse(null);
    }

    @Override
    public List<Sensor> getAll(int page) {
        List<Sensor> sensorList = sensorRepository.findAll();
        sensorList.sort(Comparator.comparing(Sensor::getId));
        return sensorList.subList(page * Constants.PAGE_SIZE, Math.min((page + 1) * Constants.PAGE_SIZE, sensorList.size()));
    }

    @Override
    public Sensor update(double latitude, double longitude, Address address, Long id, Long userId) {
        authorizeCustomerOrAdmin();
        var userRole = userRepository.findById(userId).orElse(null).getAuthorities().stream().findFirst().orElse(null);
        if(isSensorOwnedByUser(id) || userRole.getAuthority().equals("ADMIN")) {
            return sensorRepository.findById(id)
                    .map(sensor -> {
                        sensor.setLatitude(latitude);
                        sensor.setLongitude(longitude);
                        sensor.setAddress(address);
                        sensor.setUpdatedAtTimestamp(LocalDateTime.now());
                        return sensorRepository.save(sensor);
                    })
                    .orElse(null);
        }
        throw new ResponseException("Access denied. You do not own this sensor.", HttpStatus.FORBIDDEN);
    }

    @Override
    public Long getCount() {
        return sensorRepository.count();
    }

    @Override
    public void delete(Long id, Long userId) {
        authorizeCustomerOrAdmin();
        var userRole = userRepository.findById(userId).orElse(null).getAuthorities().stream().findFirst().orElse(null);
        if(isSensorOwnedByUser(id) || userRole.getAuthority().equals("ADMIN")) {
            sensorRepository.deleteById(id);
        } else
            throw new ResponseException("Access denied. You do not own this sensor.", HttpStatus.FORBIDDEN);
    }

    @Override
    public List<Sensor> getClosest(double myLatitude, double myLongitude, int number) {
        List<Sensor> sensorList = sensorRepository.findAll();
        sensorList.removeIf(Sensor::getIsPrivate);
        sensorList.removeIf(sensor -> sensor.getAddress() == null);
        sensorList.sort(Comparator.comparingDouble(sensor ->
                calculateDistance(sensor.getLatitude(), sensor.getLongitude(), myLatitude, myLongitude)));
        return sensorList.subList(0, Math.min(number, sensorList.size()));
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371;
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    @Override
    public Sensor reserveSensor(Long sensorId, Long userId) {
        Optional<Sensor> sensorOptional = sensorRepository.findById(sensorId);
        Optional<User> userOptional = userRepository.findById(userId);
        if (sensorOptional.isPresent() && userOptional.isPresent()) {
            Sensor sensor = sensorOptional.get();
            User user = userOptional.get();

            if (!sensor.isAvailable() || user.getReservedSensorId() != null) {
                return null;
            }

            System.out.println("Sensor is private: " + sensor.getIsPrivate() + " and user is owner: " + isSensorOwnedByUser(sensorId));
            if (sensor.getIsPrivate() && !isSensorOwnedByUser(sensorId)) {
                return null;
            }

            sensor.setReservationStartTimestamp(LocalDateTime.now());
            sensor.setReservedByUserId(userId);
            sensor.setAvailable(false);
            sensorRepository.save(sensor);

            user.setReservedSensorId(sensorId);
            userRepository.save(user);

            return sensor;
        }
        return null;
    }

    @Override
    public Reservation endReservation(Long sensorId, Long userId, String paymentMethod) {
        Optional<Sensor> sensorOptional = sensorRepository.findById(sensorId);
        Optional<User> userOptional = userRepository.findById(userId);
        if (sensorOptional.isPresent() && userOptional.isPresent()) {
            Sensor sensor = sensorOptional.get();
            User user = userOptional.get();

            if (sensor.isAvailable()) {
                return null;
            }
            if (!sensor.getReservedByUserId().equals(userId)) {
                return null;
            }

            long reservationHours = sensor.getReservationStartTimestamp().until(LocalDateTime.now(), java.time.temporal.ChronoUnit.HOURS);
            BigDecimal reservationCost = calculateReservationCost(sensorId, reservationHours + 1);
            LocalDateTime reservationStartTime = sensor.getReservationStartTimestamp();
            LocalDateTime reservationEndTime = LocalDateTime.now();

            Reservation reservation = new Reservation(sensor, userId, reservationStartTime, reservationEndTime, reservationCost, paymentMethod);
            reservationRepository.save(reservation);

            sensor.setReservationStartTimestamp(null);
            sensor.setReservedByUserId(null);
            sensor.setAvailable(true);
            sensor.setLifted(true);
            sensorRepository.save(sensor);

            user.setReservedSensorId(null);
            userRepository.save(user);

            return reservation;
        }
        return null;
    }

    public BigDecimal calculateReservationCost(Long sensorId, long reservationDurationInHours) {
        Optional<Sensor> sensorOptional = sensorRepository.findById(sensorId);
        if (sensorOptional.isPresent()) {
            Sensor sensor = sensorOptional.get();
            BigDecimal pricePerHour = sensor.getReservationPricePerHour();
            return pricePerHour.multiply(BigDecimal.valueOf(reservationDurationInHours));
        } else {
            throw new ResponseException("Sensor not found.", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public boolean updateSensorPirvateState(Long sensorId, Boolean available) {
        authorizeCustomerOrAdmin();
        Optional<Sensor> sensorOptional = sensorRepository.findById(sensorId);
        if (sensorOptional.isPresent() && isSensorOwnedByUser(sensorId)) {
            Sensor sensor = sensorOptional.get();
            sensor.setIsPrivate(available);
            sensorRepository.save(sensor);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Sensor lowerSensor(Long sensorId, Long userId) {
        Optional<Sensor> sensorOptional = sensorRepository.findById(sensorId);
        if (sensorOptional.isPresent()) {
            Sensor sensor = sensorOptional.get();
            if (sensor.isAvailable()) {
                return null;
            }
            if (!sensor.getReservedByUserId().equals(userId)) {
                return null;
            }
            if (sensor.isLifted()) {
                sensor.setLifted(false);
                sensor.setUpdatedAtTimestamp(LocalDateTime.now());
                sensorRepository.save(sensor);
                return sensor;
            }
        }
        return null;
    }
}