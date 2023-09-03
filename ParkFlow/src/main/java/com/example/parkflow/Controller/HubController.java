package com.example.parkflow.Controller;

import com.example.parkflow.Controller.DTO.HubDTO;
import com.example.parkflow.Domain.Hub;
import com.example.parkflow.Service.HubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/hubs")
public class HubController {
    private final HubService hubService;

    @Autowired
    public HubController(HubService hubService) {
        this.hubService = hubService;
    }

    @PostMapping
    public ResponseEntity<Hub> createHub(@RequestBody HubDTO hubDTO) {
        Hub createdHub = hubService.createHub(hubDTO.getLatitude(), hubDTO.getLongitude());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdHub);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HubDTO> getHubById(@PathVariable Long id) {
        Hub hub = hubService.getHubById(id);
        if (hub != null) {
            HubDTO hubDTO = new HubDTO(hub);
            return ResponseEntity.ok(hubDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Hub>> getAllHubs() {
        List<Hub> hubs = hubService.getAllHubs();
        return ResponseEntity.ok(hubs);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HubDTO> updateHub(@PathVariable Long id, @RequestBody HubDTO hubDTO) {
        Hub hub = hubService.updateHub(id, hubDTO.getLatitude(), hubDTO.getLongitude());
        if (hub != null) {
            HubDTO updatedHubDTO = new HubDTO(hub);
            return ResponseEntity.ok(updatedHubDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHub(@PathVariable Long id) {
        hubService.deleteHub(id);
        return ResponseEntity.noContent().build();
    }
}
