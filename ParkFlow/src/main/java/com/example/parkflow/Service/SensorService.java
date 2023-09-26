package com.example.parkflow.Service;

import com.example.parkflow.Domain.Address;
import com.example.parkflow.Domain.Reservation;
import com.example.parkflow.Domain.Sensor;
import org.springframework.security.core.Authentication;

import java.math.BigDecimal;
import java.util.List;

public interface SensorService {

    boolean isSensorOwnedByUser(Long sensorId);

    void updatePricePerHour(Long sensorId, BigDecimal pricePerHour);

    Sensor create(double latitude, double longitude, Address address);

    Sensor getById(Long id);

    List<Sensor> getAll(int page);

    Sensor update(double latitude, double longitude, Address address, Long id);

    Long getCount();

    void delete(Long id);

    List<Sensor> getClosest(double myLatitude, double myLongitude, int number);

    Sensor reserveSensor(Long sensorId, Long userId);

    Reservation endReservation(Long sensorId, Long userId, String paymentMethod);

    boolean updateSensorAvailability(Long sensorId, Boolean available);

    Sensor lowerSensor(Long sensorId, Long userId);
}
