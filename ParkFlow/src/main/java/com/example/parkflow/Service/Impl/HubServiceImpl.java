package com.example.parkflow.Service.Impl;

import com.example.parkflow.Domain.Hub;
import com.example.parkflow.Domain.Sensor;
import com.example.parkflow.Repository.HubRepository;
import com.example.parkflow.Repository.SensorRepository;
import com.example.parkflow.Service.HubService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.example.parkflow.Utils.Constants.PAGE_SIZE;

@Service
public class HubServiceImpl implements HubService {
    private final HubRepository hubRepository;
    private final SensorRepository sensorRepository;

    @Autowired
    public HubServiceImpl(HubRepository hubRepository, SensorRepository sensorRepository) {
        this.hubRepository = hubRepository;
        this.sensorRepository = sensorRepository;
    }

    @Override
    public Hub create(double latitude, double longitude) {
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
        hubRepository.deleteById(hubId);
    }

    @Override
    public Hub addSensorToHub(Long hubId, Long sensorId) {
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