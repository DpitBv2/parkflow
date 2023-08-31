package com.example.parkflow.Service;

import com.example.parkflow.Domain.Sensor;
import com.example.parkflow.Repository.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class SensorService {
    private final SensorRepository sensorRepository;
    @Autowired
    public SensorService(SensorRepository sensorRepository) {
        this.sensorRepository = sensorRepository;
    }
    public Sensor createSensor(Sensor sensor) {
        return sensorRepository.save(sensor);
    }
    public Sensor getSensorById(Long id) {
        return sensorRepository.findById(id).orElse(null);
    }
    public List<Sensor> getAllSensors() {
        return sensorRepository.findAll();
    }
    public Sensor updateSensor(Sensor sensor) {
        return sensorRepository.save(sensor);
    }
    public void deleteSensor(Long id) {
        sensorRepository.deleteById(id);
    }
    public List<Sensor> getClosestSensors(double myLatitude, double myLongitude) {
        List<Sensor> sensorList = sensorRepository.findAll();
        sensorList.sort(Comparator.comparingDouble(sensor ->
                calculateDistance(sensor.getLatitude(), sensor.getLongitude(), myLatitude, myLongitude)));
        return sensorList.subList(0, Math.min(100, sensorList.size()));
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
}