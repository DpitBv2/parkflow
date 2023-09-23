package com.example.parkflow.Service.Impl;

import com.example.parkflow.Domain.Hub;
import com.example.parkflow.Domain.Sensor;
import com.example.parkflow.Domain.User;
import com.example.parkflow.Repository.HubRepository;
import com.example.parkflow.Repository.SensorRepository;
import com.example.parkflow.Repository.UserRepository;
import com.example.parkflow.Service.HubService;
import com.example.parkflow.Utils.ResponseException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.example.parkflow.Utils.Constants.PAGE_SIZE;

@Service
public class HubServiceImpl implements HubService {
    private final HubRepository hubRepository;
    private final SensorRepository sensorRepository;
    private UserRepository userRepository;

    @Autowired
    public HubServiceImpl(HubRepository hubRepository, SensorRepository sensorRepository, UserRepository userRepository) {
        this.hubRepository = hubRepository;
        this.sensorRepository = sensorRepository;
        this.userRepository = userRepository;
    }
    private void authorizeCustomerOrAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            Object principal = authentication.getPrincipal();
            System.out.println("Principal: " + principal);
            if (principal != null) {
                User user = userRepository.findByEmail(principal.toString()).orElse(null);
                System.out.println("User: " + user.getUsername() + " has authorities: " + user.getAuthorities());
                if (user.getAuthorities().stream()
                        .anyMatch(authority -> authority.getAuthority().equals("CUSTOMER") || authority.getAuthority().equals("ADMIN"))) {
                    return;
                }
            }
        }
        throw new ResponseException("Access denied. You must have CUSTOMER or ADMIN role.", HttpStatus.FORBIDDEN);
    }
    @Override
    public Hub create(double latitude, double longitude) {
        authorizeCustomerOrAdmin();
        Hub hub = new Hub();
        hub.setLatitude(latitude);
        hub.setLongitude(longitude);
        return hubRepository.save(hub);
    }
    @Transactional
    @Override
    public List<Hub> getAllWithSensors() {
        List<Hub> hubs = hubRepository.findAll();
        for (Hub hub : hubs) {
            hub.getSensors().size();
        }
        return hubs;
    }
    @Override
    public List<Hub> getAll(int page) {
        List<Hub> hubs = hubRepository.findAll();
        return hubs.subList(page * PAGE_SIZE, Math.min((page + 1) * PAGE_SIZE, hubs.size()));
    }
    @Override
    public Hub getById(Long hubId) {
        Optional<Hub> hubOptional = hubRepository.findById(hubId);
        return hubOptional.orElse(null);
    }

    @Override
    public Long getCount() {
        return hubRepository.count();
    }

    @Override
    public Hub update(Long hubId, double latitude, double longitude) {
        authorizeCustomerOrAdmin();
        Optional<Hub> hubOptional = hubRepository.findById(hubId);
        if (hubOptional.isPresent()) {
            Hub hub = hubOptional.get();
            hub.setLatitude(latitude);
            hub.setLongitude(longitude);
            return hubRepository.save(hub);
        }
        return null;
    }

    @Override
    public void delete(Long hubId) {
        authorizeCustomerOrAdmin();
        hubRepository.deleteById(hubId);
    }

    @Override
    public Hub addSensorToHub(Long hubId, Long sensorId) {
        authorizeCustomerOrAdmin();
        Optional<Hub> hubOptional = hubRepository.findById(hubId);
        Optional<Sensor> sensorOptional = sensorRepository.findById(sensorId);

        System.out.println("hubOptional: " + hubOptional);
        System.out.println("sensorOptional: " + sensorOptional);

        if (hubOptional.isPresent() && sensorOptional.isPresent()) {
            Hub hub = hubOptional.get();
            Sensor sensor = sensorOptional.get();
            hub.addSensor(sensor);
            hubRepository.save(hub);
            sensorRepository.save(sensor);
            return hub;
        }
        return null;
    }
}