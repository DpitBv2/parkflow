package com.example.parkflow.Service;

import com.example.parkflow.Domain.Address;
import com.example.parkflow.Domain.Reservation;
import com.example.parkflow.Domain.Sensor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface SensorService {

    void updatePricePerHour(Long sensorId, BigDecimal pricePerHour);

    Sensor create(double latitude, double longitude, Address address);

    Sensor getById(Long id);

    List<Sensor> getAll(int page);

    Sensor update(double latitude, double longitude, Address address, Long id);

    Long getCount();

    void delete(Long id);

    List<Sensor> getClosest(double myLatitude, double myLongitude, int number);

    Reservation reserveSensor(Long sensorId, Long userId, int reservationDurationInHours);

    boolean updateSensorAvailability(Long sensorId, Boolean available);
}
