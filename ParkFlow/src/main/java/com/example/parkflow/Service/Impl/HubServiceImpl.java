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

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
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
    @Override
    public boolean isHubOwnedByUser(Long hubId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.toString()).orElse(null);
        try {
            if (user != null) {
                Optional<Hub> hubOptional = hubRepository.findById(hubId);
                if (hubOptional.isPresent()) {
                    Hub hub = hubOptional.get();
                    System.out.println(hub.getOwner());
                    return hub.getOwner().equals(user);
                }
            }
            return false;
        } catch (Exception e) {
            return false;
        }
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
    public Hub create(double latitude, double longitude, String token) {
        authorizeCustomerOrAdmin();
        Hub hub = new Hub();
        hub.setLatitude(latitude);
        hub.setLongitude(longitude);
        hub.setToken(token);
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
    public Hub update(Long hubId, double latitude, double longitude, Long userId) {
        authorizeCustomerOrAdmin();
        var userRole = Objects.requireNonNull(userRepository.findById(userId).orElse(null)).getAuthorities().stream().findFirst().orElse(null);
        if(isHubOwnedByUser(hubId) || Objects.requireNonNull(userRole).getAuthority().equals("ADMIN")) {
            Optional<Hub> hubOptional = hubRepository.findById(hubId);
            if (hubOptional.isPresent()) {
                Hub hub = hubOptional.get();
                hub.setLatitude(latitude);
                hub.setLongitude(longitude);
                return hubRepository.save(hub);
            }
            return null;
        }
        throw new ResponseException("Access denied. You do not own this sensor.", HttpStatus.FORBIDDEN);
    }
    @Override
    public void delete(Long hubId, Long userId) {
        authorizeCustomerOrAdmin();
        var userRole = Objects.requireNonNull(userRepository.findById(userId).orElse(null)).getAuthorities().stream().findFirst().orElse(null);
        if(isHubOwnedByUser(hubId) || Objects.requireNonNull(userRole).getAuthority().equals("ADMIN")) {
            hubRepository.deleteById(hubId);
        }
        throw new ResponseException("Access denied. You do not own this sensor.", HttpStatus.FORBIDDEN);
    }

    @Override
    public Hub addSensorToHub(Long hubId, Long sensorId, Long userId) {
        authorizeCustomerOrAdmin();
        Optional<Hub> hubOptional = hubRepository.findById(hubId);
        Optional<Sensor> sensorOptional = sensorRepository.findById(sensorId);
        var userRole = Objects.requireNonNull(userRepository.findById(userId).orElse(null)).getAuthorities().stream().findFirst().orElse(null);
        if (hubOptional.isPresent() && sensorOptional.isPresent()) {
            if (!isHubOwnedByUser(hubId) && !Objects.requireNonNull(userRole).getAuthority().equals("ADMIN")) {
                throw new ResponseException("Access denied. You do not own this sensor.", HttpStatus.FORBIDDEN);
            }
            Hub hub = hubOptional.get();
            if (hub.getLatitude() == 0 && hub.getLongitude() == 0)
                return null;

            Sensor sensor = sensorOptional.get();
            hub.addSensor(sensor);
            hubRepository.save(hub);
            sensorRepository.save(sensor);
            return hub;
        }
        return null;
    }
    @Override
    public List<Long> getSensorIdsUpdatedSinceForHub(Hub hub, LocalDateTime timestamp) {
        List<Long> updatedSensorIds = sensorRepository.findSensorIdsUpdatedSinceForHub(hub.getId(), timestamp);
        return updatedSensorIds;
    }
    @Override
    public boolean isValidHubToken(String hubToken) {
        return hubRepository.existsByToken(hubToken);
    }

    @Override
    public Hub getHubByToken(String token) {
        List<Hub> hubs = hubRepository.findAll();
        for (Hub hub : hubs) {
            if (hub.getToken().equals(token)) {
                return hub;
            }
        }
        return null;
    }
}