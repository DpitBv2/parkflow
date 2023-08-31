package com.example.parkflow.Controller;

import com.example.parkflow.Domain.Sensor;
import com.example.parkflow.Service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/api/v1/sensors")
public class SensorController {
    private final SensorService sensorService;
    private List<Sensor> sensorList = new ArrayList<>();

    @Autowired
    public SensorController(SensorService sensorService) {
        this.sensorService = sensorService;
    }
//    @PostMapping("/add-sensor")
//    public ResponseEntity<String> addSensor(@RequestBody Sensor newSensor) {
//        if (newSensor.getHubId() == null ||
//                newSensor.getLatitude() == 0.0 || newSensor.getLongitude() == 0.0) {
//            return ResponseEntity.badRequest().body("Required fields are missing");
//        }
//        if (newSensor.getLatitude() < -90 || newSensor.getLatitude() > 90 ||
//                newSensor.getLongitude() < -180 || newSensor.getLongitude() > 180) {
//            return ResponseEntity.badRequest().body("Invalid latitude or longitude");
//        }
//        LocalDateTime currentDateTime = LocalDateTime.now(ZoneId.systemDefault());
//        newSensor.setCreatedAtTimestamp(currentDateTime);
//        sensorList.add(newSensor);
//        return ResponseEntity.status(HttpStatus.CREATED).body("Sensor added successfully");
//    }
    @PostMapping
    public ResponseEntity<Sensor> createSensor(@RequestBody Sensor sensor) {
        Sensor createdSensor = sensorService.createSensor(sensor);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSensor);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sensor> getSensorById(@PathVariable Long id) {
        Sensor sensor = sensorService.getSensorById(id);
        if (sensor != null) {
            return ResponseEntity.ok(sensor);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Sensor>> getAllSensors() {
        List<Sensor> sensors = sensorService.getAllSensors();
        return ResponseEntity.ok(sensors);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sensor> updateSensor(@PathVariable Long id, @RequestBody Sensor sensor) {
        Sensor updatedSensor = sensorService.updateSensor(sensor);
        if (updatedSensor != null) {
            return ResponseEntity.ok(updatedSensor);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSensor(@PathVariable Long id) {
        sensorService.deleteSensor(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/closest")
    public ResponseEntity<List<Sensor>> getClosestSensors(@RequestParam double latitude, @RequestParam double longitude) {
        List<Sensor> closestSensors = sensorService.getClosestSensors(latitude, longitude);
        return ResponseEntity.ok(closestSensors);
    }
}
