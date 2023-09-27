package com.example.parkflow.Controller;

import com.example.parkflow.Controller.DTO.HubDTO;
import com.example.parkflow.Domain.Authority;
import com.example.parkflow.Domain.Hub;
import com.example.parkflow.Domain.User;
import com.example.parkflow.Service.Impl.HubServiceImpl;
import com.example.parkflow.Service.Impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/hubs")
public class HubController {
    private final HubServiceImpl hubService;
    private final UserServiceImpl userService;

    @Autowired
    public HubController(HubServiceImpl hubService, UserServiceImpl userService) {
        this.hubService = hubService;
        this.userService = userService;
    }

    /**
     * Create a new hub
     * @param hubDTO : the dto containing sensor information
     * @return status {@code 201 (CREATED)} and body {@link Hub}
     */
    @PostMapping
    public ResponseEntity<Hub> createHub(@RequestBody HubDTO hubDTO) {
        Hub createdHub = hubService.create(hubDTO.getLatitude(), hubDTO.getLongitude());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdHub);
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
}
