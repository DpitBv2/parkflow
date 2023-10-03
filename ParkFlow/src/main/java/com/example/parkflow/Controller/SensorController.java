package com.example.parkflow.Controller;

import com.example.parkflow.Controller.DTO.SensorDTO;
import com.example.parkflow.Domain.Reservation;
import com.example.parkflow.Domain.Sensor;
import com.example.parkflow.Domain.User;
import com.example.parkflow.Service.Impl.SensorServiceImpl;
import com.example.parkflow.Service.Impl.UserServiceImpl;
import com.example.parkflow.Utils.ResponseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/sensors")
public class SensorController {
    private final SensorServiceImpl sensorService;
    private final UserServiceImpl userService;
    private List<Sensor> sensorList = new ArrayList<>();

    @Autowired
    public SensorController(SensorServiceImpl sensorService, UserServiceImpl userService) {
        this.sensorService = sensorService;
        this.userService = userService;
    }

    /**
     * {@code POST /api/v1/sensors} : Create a new sensor
     * @param sensorDTO : the dto containing sensor information
     * @return status {@code 201 (CREATED)} and body {@link Sensor}
     */
    @PostMapping
    public ResponseEntity<Sensor> createSensor(
            @RequestBody SensorDTO sensorDTO,
            Authentication authentication) {
        User user = userService.get((String) authentication.getPrincipal());
        String userEmail = user.getEmail();
        if (userService.getUserRoleByEmail(userEmail).equals("ADMIN")) {
            Sensor createdSensor = sensorService.create(sensorDTO.getLatitude(), sensorDTO.getLongitude(), sensorDTO.getAddress(), false, sensorDTO.getName(), sensorDTO.getIsElectric());
            if (createdSensor != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body(createdSensor);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
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
    @PutMapping("/{id}")
    public ResponseEntity<Sensor> updateSensor(@PathVariable Long id, @RequestBody SensorDTO sensorDTO, Authentication authentication) {
        User user = userService.get((String) authentication.getPrincipal());
        Sensor updatedSensor = sensorService.update(sensorDTO.getLatitude(), sensorDTO.getLongitude(), sensorDTO.getAddress(), id, user.getId(), sensorDTO.getName(), sensorDTO.getIsElectric());
        if (updatedSensor != null) return ResponseEntity.ok(updatedSensor);
        else return ResponseEntity.notFound().build();
    }

    /**
     * {@code DELETE /api/v1/sensors/{id}} : Delete sensor
     * @param id : sensor id
     * @return status {@code 204 (NO_CONTENT)}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSensor(@PathVariable Long id, Authentication authentication) {
        User user = userService.get((String) authentication.getPrincipal());
        sensorService.delete(id, user.getId());
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

    /**
     * {@code POST /api/v1/sensors/reserve} : Reserve sensor
     * @param sensorId : sensor id
     * @return
     */
    @PostMapping("/reserve")
    public ResponseEntity<?> reserveSensor(
            @RequestParam Long sensorId,
            Authentication authentication
    ) {
        try {
            User user = userService.get((String) authentication.getPrincipal());
            Sensor sensor = sensorService.reserveSensor(sensorId, user.getId());
            if (sensor != null) {
                return ResponseEntity.ok(sensor);
            } else {
                return ResponseEntity.badRequest().body("Failed to reserve the sensor.");
            }
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code PUT /api/v1/sensors/reserve} : End reservation
     * @param sensorId : sensor id
     * @param paymentMethod : payment method
     * @return
     */
    @PutMapping("/reserve")
    public ResponseEntity<?> endReservation(
            @RequestParam Long sensorId,
            @RequestParam String paymentMethod,
            Authentication authentication
    ) {
        try {
            User user = userService.get((String) authentication.getPrincipal());
            Reservation reservation = sensorService.endReservation(sensorId, user.getId(), paymentMethod);
            if (reservation != null) {
                return ResponseEntity.ok(reservation);
            } else {
                return ResponseEntity.badRequest().body("Failed to end the reservation.");
            }
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code PUT /api/v1/sensors/reserve/lower} : Lower sensor
     * @param sensorId : sensor id
     * @return
     */
    @PutMapping("/reserve/lower")
    public ResponseEntity<?> lowerSensor(
            @RequestParam Long sensorId,
            Authentication authentication
    ) {
        try {
            User user = userService.get((String) authentication.getPrincipal());
            boolean lowered = sensorService.lowerSensor(sensorId, user.getId());
            if (lowered) {
                return ResponseEntity.ok("Sensor successfully lowered.");
            } else {
                return ResponseEntity.badRequest().body("Failed to lower the sensor.");
            }
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code PUT /api/v1/sensors/{sensorId}/price} : Update sensor price per hour
     * @param sensorId : sensor id
     * @param pricePerHour : price per hour
     * @return
     */
    @PutMapping("/{sensorId}/price")
    public ResponseEntity<?> setPricePerHour(@PathVariable Long sensorId, @RequestParam BigDecimal pricePerHour) {
        try {
            sensorService.updatePricePerHour(sensorId, pricePerHour);
            return ResponseEntity.ok().build();
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code PUT /api/v1/sensors/{id}/private} : Update sensor availability
     * @param id : sensor id
     * @param privateState : private state
     * @return
     */
    @PutMapping("/{id}/private")
    public ResponseEntity<Void> updateSensorAvailability(
            @PathVariable Long id,
            @RequestParam Boolean privateState
    ) {
        boolean updated = sensorService.updateSensorPirvateState(id, privateState);
        if (updated) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
