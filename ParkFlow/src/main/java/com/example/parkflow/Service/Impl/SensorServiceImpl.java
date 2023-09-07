package com.example.parkflow.Service.Impl;

import com.example.parkflow.Domain.Address;
import com.example.parkflow.Domain.Sensor;
import com.example.parkflow.Domain.Reservation;
import com.example.parkflow.Repository.HubRepository;
import com.example.parkflow.Repository.ReservationRepository;
import com.example.parkflow.Repository.SensorRepository;
import com.example.parkflow.Service.SensorService;
import com.example.parkflow.Utils.Constants;
import com.example.parkflow.Utils.ResponseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import java.time.LocalDateTime;

@Service
public class SensorServiceImpl implements SensorService {
    private final SensorRepository sensorRepository;
    private final ReservationRepository reservationRepository;
    private final HubRepository hubRepository;

    @Autowired
    public SensorServiceImpl(SensorRepository sensorRepository, ReservationRepository reservationRepository, HubRepository hubRepository) {
        this.sensorRepository = sensorRepository;
        this.reservationRepository = reservationRepository;
        this.hubRepository = hubRepository;
    }

    @Override
    public void updatePricePerHour(Long sensorId, BigDecimal pricePerHour) {
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
    public Sensor create(double latitude, double longitude, Address address) {
        var sensor = new Sensor(latitude, longitude, address);
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
    public Sensor update(double latitude, double longitude, Address address, Long id) {
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

    @Override
    public Long getCount() {
        return sensorRepository.count();
    }

    @Override
    public void delete(Long id) {
        sensorRepository.deleteById(id);
    }

    @Override
    public List<Sensor> getClosest(double myLatitude, double myLongitude, int number) {
        List<Sensor> sensorList = sensorRepository.findAll();
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
    public Reservation reserveSensor(Long sensorId, Long userId, int reservationDurationInHours) {
        Optional<Sensor> sensorOptional = sensorRepository.findById(sensorId);
        if (sensorOptional.isPresent()) {
            Sensor sensor = sensorOptional.get();
            if (!sensor.isAvailable()) {
                return null;
            }
            BigDecimal reservationCost = calculateReservationCost(sensorId, reservationDurationInHours);
            LocalDateTime reservationStartTime = LocalDateTime.now();
            LocalDateTime reservationEndTime = reservationStartTime.plusHours(reservationDurationInHours);
            Reservation reservation = new Reservation(sensorId, userId, reservationStartTime, reservationEndTime, reservationCost);
            reservationRepository.save(reservation);
            sensor.setAvailable(false);
            sensorRepository.save(sensor);
            return reservation;
        } else {
            return null;
        }
    }

    public BigDecimal calculateReservationCost(Long sensorId, int reservationDurationInHours) {
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
    public boolean updateSensorAvailability(Long sensorId, Boolean available) {
        Optional<Sensor> sensorOptional = sensorRepository.findById(sensorId);
        if (sensorOptional.isPresent()) {
            Sensor sensor = sensorOptional.get();
            sensor.setAvailable(available);
            sensorRepository.save(sensor);
            return true;
        } else {
            return false;
        }
    }
}