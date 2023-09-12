package com.example.parkflow.Controller;

import com.example.parkflow.Controller.DTO.SensorDTO;
import com.example.parkflow.Domain.Hub;
import com.example.parkflow.Domain.Reservation;
import com.example.parkflow.Domain.Sensor;
import com.example.parkflow.Service.Impl.SensorServiceImpl;
import com.example.parkflow.Utils.ResponseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/sensors")
public class SensorController {
    private final SensorServiceImpl sensorService;
    private List<Sensor> sensorList = new ArrayList<>();

    @Autowired
    public SensorController(SensorServiceImpl sensorService) {
        this.sensorService = sensorService;
    }

    /**
     * {@code POST /api/v1/sensors} : Create a new sensor
     * @param sensorDTO : the dto containing sensor information
     * @return status {@code 201 (CREATED)} and body {@link Sensor}
     */
    @PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    @PostMapping
    public ResponseEntity<Sensor> createSensor(@RequestBody SensorDTO sensorDTO) {
        Sensor createdSensor = sensorService.create(sensorDTO.getLatitude(), sensorDTO.getLongitude(), sensorDTO.getAddress());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSensor);
    }

    /**
     * {@code GET /api/v1/sensors/{id}} : Get sensor by id
     * @param id : sensor id
     * @return status {@code 200 (OK)} and body {@link Sensor}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Sensor> getSensorById(@PathVariable Long id) {
        Sensor sensor = sensorService.getById(id);
        if (sensor != null) {
            return ResponseEntity.ok(sensor);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * {@code GET /api/v1/sensors} : Get all sensors
     * @param page : page number
     * @return status {@code 200 (OK)} and body {@link List<Sensor>}
     */
    @GetMapping
    public ResponseEntity<List<Sensor>> getAllSensors(@RequestParam(value = "page", defaultValue = "0") int page) {
        List<Sensor> sensors = sensorService.getAll(page);
        return ResponseEntity.ok(sensors);
    }

    /**
     * {@code GET /api/v1/sensors/count} : Get sensor count
     * @return status {@code 200 (OK)} and body {@link Long}
     */
    @GetMapping("/count")
    public ResponseEntity<Long> getSensorCount() {
        return ResponseEntity.ok(sensorService.getCount());
    }

    /**
     * {@code PUT /api/v1/sensors/{id}} : Update sensor
     * @param id : sensor id
     * @param sensorDTO : sensor data
     * @return status {@code 200 (OK)} and body {@link Sensor}
     */
    @PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Sensor> updateSensor(@PathVariable Long id, @RequestBody SensorDTO sensorDTO) {
        Sensor updatedSensor = sensorService.update(sensorDTO.getLatitude(), sensorDTO.getLongitude(), sensorDTO.getAddress(), id);
        if (updatedSensor != null) return ResponseEntity.ok(updatedSensor);
        else return ResponseEntity.notFound().build();
    }

    /**
     * {@code DELETE /api/v1/sensors/{id}} : Delete sensor
     * @param id : sensor id
     * @return status {@code 204 (NO_CONTENT)}
     */
    @PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSensor(@PathVariable Long id) {
        sensorService.delete(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * {@code GET /api/v1/sensors/closest} : Get closest sensors
     * @param number : number of sensors to return
     * @param latitude : latitude
     * @param longitude : longitude
     * @return status {@code 200 (OK)} and body {@link List<Sensor>}
     */
    @GetMapping("/closest")
    public ResponseEntity<List<Sensor>> getClosestSensors(@RequestParam(value = "number", defaultValue = "10") int number, @RequestParam double latitude, @RequestParam double longitude) {
        List<Sensor> closestSensors = sensorService.getClosest(latitude, longitude, number);
        return ResponseEntity.ok(closestSensors);
    }
    @PostMapping("/reserve")
    public ResponseEntity<?> reserveSensor(
            @RequestParam Long sensorId,
            @RequestParam Long userId,
            @RequestParam int reservationDurationInHours
    ) {
        try {
            Reservation reservation = sensorService.reserveSensor(sensorId, userId, reservationDurationInHours);
            if (reservation != null) {
                return ResponseEntity.ok(reservation);
            } else {
                return ResponseEntity.badRequest().body("Failed to reserve the sensor.");
            }
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }
    @PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    @PutMapping("/{sensorId}/price")
    public ResponseEntity<?> setPricePerHour(@PathVariable Long sensorId, @RequestParam BigDecimal pricePerHour) {
        try {
            sensorService.updatePricePerHour(sensorId, pricePerHour);
            return ResponseEntity.ok().build();
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/availability")
    public ResponseEntity<Void> updateSensorAvailability(
            @PathVariable Long id,
            @RequestParam Boolean available
    ) {
        boolean updated = sensorService.updateSensorAvailability(id, available);
        if (updated) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
