package com.example.parkflow.Service;

import com.example.parkflow.Domain.Hub;

import java.util.List;

public interface HubService {
    boolean isHubOwnedByUser(Long hubId);
    Hub create(double latitude, double longitude);
    List<Hub> getAllWithSensors();

    List<Hub> getAll(int page);

    Long getCount();

    Hub getById(Long hubId);

    Hub update(Long hubId, double latitude, double longitude);

    void delete(Long hubId);

    Hub addSensorToHub(Long hubId, Long sensorId);
}
