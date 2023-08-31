package com.example.parkflow.Controller;

import com.example.parkflow.Domain.Sensor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@RestController
public class SensorController {
    private List<Sensor> sensorList = new ArrayList<>();

    @PostMapping("/add-sensor")
    public ResponseEntity<String> addSensor(@RequestBody Sensor newSensor) {
        sensorList.add(newSensor);
        return ResponseEntity.status(HttpStatus.CREATED).body("Sensor added successfully");
    }
    @GetMapping("/closest-sensors")
    public List<Sensor> getClosestSensors(
            @RequestParam("latitude") double myLatitude,
            @RequestParam("longitude") double myLongitude
    ) {
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