package com.example.parkflow.Service.Impl;

import com.example.parkflow.Domain.Address;
import com.example.parkflow.Domain.Hub;
import com.example.parkflow.Domain.Sensor;
import com.example.parkflow.Repository.HubRepository;
import com.example.parkflow.Repository.SensorRepository;
import com.example.parkflow.Service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import static com.example.parkflow.Utils.Constants.PAGE_SIZE;

@Service
public class SensorServiceImpl implements SensorService {
    private final SensorRepository sensorRepository;

    @Autowired
    public SensorServiceImpl(SensorRepository sensorRepository) {
        this.sensorRepository = sensorRepository;
    }

    @Autowired
    private HubRepository hubRepository;

    @Override
    public Sensor create(double latitude, double longitude, Address address) {
        var sensor = new Sensor(latitude, longitude, address);
        return sensorRepository.save(sensor);
    }

    @Override
    public Sensor getById(Long id) {
        return sensorRepository.findById(id).orElse(null);
    }

    @Override
    public List<Sensor> getAll(int page) {
        List<Sensor> sensorList = sensorRepository.findAll();
        sensorList.sort(Comparator.comparing(Sensor::getId));
        return sensorList.subList(page * PAGE_SIZE, Math.min((page + 1) * PAGE_SIZE, sensorList.size()));
    }

    @Override
    public Sensor update(double latitude, double longitude, Address address, Long id) {
        return sensorRepository.findById(id)
                .map(sensor -> {
                    sensor.setLatitude(latitude);
                    sensor.setLongitude(longitude);
                    sensor.setAddress(address);
                    sensor.setUpdatedAtTimestamp(java.time.LocalDateTime.now());
                    return sensorRepository.save(sensor);
                })
                .orElseGet(null);
    }

    @Override
    public Long getCount() {
        return sensorRepository.count();
    }

    @Override
    public void delete(Long id) {
        sensorRepository.deleteById(id);
    }

    @Override
    public List<Sensor> getClosest(double myLatitude, double myLongitude, int number) {
        List<Sensor> sensorList = sensorRepository.findAll();
        sensorList.sort(Comparator.comparingDouble(sensor ->
                calculateDistance(sensor.getLatitude(), sensor.getLongitude(), myLatitude, myLongitude)));
        return sensorList.subList(0, Math.min(number, sensorList.size()));
    }

    @Override
    public Sensor setHubId(Long hubId, Long sensorId) {
        return sensorRepository.findById(sensorId)
                .map(sensor -> {
                    sensor.setHubId(hubId);
                    return sensorRepository.save(sensor);
                })
                .orElseGet(null);
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371;
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    public Hub addSensorToHub(Long hubId, Long sensorId) {
        Optional<Hub> hubOptional = hubRepository.findById(hubId);
        Optional<Sensor> sensorOptional = sensorRepository.findById(sensorId);

        if (hubOptional.isPresent() && sensorOptional.isPresent()) {
            Hub hub = hubOptional.get();
            Sensor sensor = sensorOptional.get();
            sensor.setHubId(hub.getHubId());
            hub.addSensor(sensor);
            sensorRepository.save(sensor);
            hubRepository.save(hub);
            return hub;
        } else {
            return null; // Hub or Sensor not found
        }
    }
}