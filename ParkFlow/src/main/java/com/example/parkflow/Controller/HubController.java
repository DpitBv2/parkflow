package com.example.parkflow.Controller;

import com.example.parkflow.Controller.DTO.DataDTO;
import com.example.parkflow.Controller.DTO.HubDTO;
import com.example.parkflow.Controller.DTO.SensorDTO;
import com.example.parkflow.Domain.Authority;
import com.example.parkflow.Domain.Hub;
import com.example.parkflow.Domain.Sensor;
import com.example.parkflow.Domain.User;
import com.example.parkflow.Service.Impl.HubServiceImpl;
import com.example.parkflow.Service.Impl.UserServiceImpl;
import com.example.parkflow.Service.SensorService;
import com.example.parkflow.Utils.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/hubs")
public class HubController {
    private final HubServiceImpl hubService;
    private final UserServiceImpl userService;
    private LocalDateTime lastRetrievalTimestamp = LocalDateTime.now();
    private SensorService sensorService;

    @Autowired
    public HubController(HubServiceImpl hubService, UserServiceImpl userService, SensorService sensorService) {
        this.hubService = hubService;
        this.userService = userService;
        this.sensorService = sensorService;
    }

    /**
     * Create a new hub
     * @param hubDTO : the dto containing sensor information
     * @return status {@code 201 (CREATED)} and body {@link Hub}
     */
    @PostMapping
    public ResponseEntity<Hub> createHub(
            @RequestBody HubDTO hubDTO,
            Authentication authentication) {
        User user = userService.get((String) authentication.getPrincipal());
        String userEmail = user.getEmail();
        if (userService.getUserRoleByEmail(userEmail).equals("ADMIN")) {
            Hub createdHub = hubService.create(hubDTO.getLatitude(), hubDTO.getLongitude());
            if (createdHub != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body(createdHub);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    /**
     * Get hub by id
     * @param id : hub id
     * @return status {@code 200 (OK)} and body {@link Hub}
     */
    @GetMapping("/{id}")
    public ResponseEntity<HubDTO> getHubById(@PathVariable Long id) {
        Hub hub = hubService.getById(id);
        if (hub != null) {
            HubDTO hubDTO = new HubDTO(hub);
            return ResponseEntity.ok(hubDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Get all hubs
     * @return status {@code 200 (OK)} and body {@link List<Hub>}
     */
    @GetMapping
    public ResponseEntity<List<Hub>> getAllHubs(@RequestParam(value = "page", defaultValue = "0") int page) {
        List<Hub> hubs = hubService.getAll(page);
        return ResponseEntity.ok(hubs);
    }

    /**
     * Get hubs count
     * @return status {@code 200 (OK)} and body {@link Long}
     */
    @GetMapping("/count")
    public ResponseEntity<Long> getHubsCount() {
        return ResponseEntity.ok(hubService.getCount());
    }

    /**
     * Update hub by id
     * @param id : hub id
     * @param hubDTO : the dto containing sensor information
     * @return status {@code 200 (OK)} and body {@link Hub}
     */
    @PutMapping
    public ResponseEntity<HubDTO> updateHub(@RequestParam Long id, @RequestBody HubDTO hubDTO, Authentication authentication) {
        User user = userService.get((String) authentication.getPrincipal());
        Hub hub = hubService.update(id, hubDTO.getLatitude(), hubDTO.getLongitude() ,user.getId());
        if (hub != null) {
            HubDTO updatedHubDTO = new HubDTO(hub);
            return ResponseEntity.ok(updatedHubDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Delete hub by id
     * @param id : hub id
     * @return status {@code 204 (NO CONTENT)}
     */
    @DeleteMapping
    public ResponseEntity<Void> deleteHub(@RequestParam Long id, Authentication authentication) {
        User user = userService.get((String) authentication.getPrincipal());
        hubService.delete(id, user.getId());
        return ResponseEntity.noContent().build();
    }

    /**
     * Add sensor to hub
     * @param hubId : hub id
     * @param sensorId : sensor id
     * @return status {@code 200 (OK)} and body {@link Hub}
     */
    @PutMapping("/sensor")
    public ResponseEntity<Hub> addSensorToHub(@RequestParam Long hubId, @RequestParam Long sensorId) {
        Hub updatedHub = hubService.addSensorToHub(hubId, sensorId);
        if (updatedHub != null) {
            return ResponseEntity.ok(updatedHub);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/sensorToken")
    public ResponseEntity<?> addSensorToHub(@RequestParam String token, @RequestParam Long sensorId) {
        Hub updatedHub = hubService.addSensorToHubByToken(token, sensorId);
        if (updatedHub != null) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Get all updated sensors for a specific hub since last retrieval.
     * @param token: Hub token
     * @return status {@code 200 (OK)} and body List of SensorDTO
     */
    @GetMapping("/updatedSensors")
    public ResponseEntity<List<DataDTO>> getUpdatedSensorIdsForHub(@RequestParam String token) {
        Hub hub = hubService.getHubByToken(token);
        if (hub == null) {
            return ResponseEntity.notFound().build();
        }
        var updatedSensorIds = hubService.getSensorIdsUpdatedSinceForHub(hub, lastRetrievalTimestamp);
        lastRetrievalTimestamp = LocalDateTime.now();
        return ResponseEntity.ok(updatedSensorIds);
    }

    /**
     * Get all sensors for a specific hub.
     * @param hubId: Hub ID
     * @return status {@code 200 (OK)} and body List of SensorDTO
     */
    @GetMapping("/sensors")
    public ResponseEntity<List<SensorDTO>> getSensorsForHub(@RequestParam Long hubId) {
        Hub hub = hubService.getById(hubId);
        if (hub != null) {
            List<Sensor> sensors = hub.getSensors();
            List<SensorDTO> sensorDTOs = sensors.stream()
                    .map(SensorDTO::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(sensorDTOs);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Set hub token
     * @param hubId: Hub ID
     * @return status {@code 200 (OK)} and body {@link Hub}
     */
    @PutMapping("/token")
    public ResponseEntity<Hub> updateHubToken(@RequestParam Long hubId, @RequestParam String token, Authentication authentication) {
        User user = userService.get((String) authentication.getPrincipal());
        Hub updatedHub = hubService.setHubToken(hubId, token, user.getId());
        if (updatedHub != null) {
            return ResponseEntity.ok(updatedHub);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
