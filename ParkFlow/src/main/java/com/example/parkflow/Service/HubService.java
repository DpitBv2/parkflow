package com.example.parkflow.Service;

import com.example.parkflow.Domain.Hub;
import com.example.parkflow.Repository.HubRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HubService {
    private final HubRepository hubRepository;

    @Autowired
    public HubService(HubRepository hubRepository) {
        this.hubRepository = hubRepository;
    }

    public Hub createHub(double latitude, double longitude) {
        Hub hub = new Hub();
        hub.setLatitude(latitude);
        hub.setLongitude(longitude);
        return hubRepository.save(hub);
    }

    @Transactional
    public List<Hub> getAllHubsWithSensors() {
        return hubRepository.findAll();
    }
    public List<Hub> getAllHubs() {
        return hubRepository.findAll();
    }
    public Hub getHubById(Long hubId) {
        Optional<Hub> hubOptional = hubRepository.findById(hubId);
        return hubOptional.orElse(null);
    }

    public Hub updateHub(Long hubId, double latitude, double longitude) {
        Optional<Hub> hubOptional = hubRepository.findById(hubId);
        if (hubOptional.isPresent()) {
            Hub hub = hubOptional.get();
            hub.setLatitude(latitude);
            hub.setLongitude(longitude);
            return hubRepository.save(hub);
        }
        return null;
    }

    public void deleteHub(Long hubId) {
        hubRepository.deleteById(hubId);
    }
}