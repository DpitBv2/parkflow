package com.example.parkflow.Service;

import com.example.parkflow.Domain.Address;
import com.example.parkflow.Domain.Sensor;

import java.util.List;

public interface SensorService {
    Sensor create(double latitude, double longitude, Address address);

    Sensor getById(Long id);

    List<Sensor> getAll(int page);

    Sensor update(double latitude, double longitude, Address address, Long id);

    Long getCount();

    void delete(Long id);

    List<Sensor> getClosest(double myLatitude, double myLongitude, int number);
}
