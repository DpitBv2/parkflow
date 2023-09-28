package com.example.parkflow.Service;

import com.example.parkflow.Domain.Hub;
import com.example.parkflow.Domain.Sensor;

import java.time.LocalDateTime;
import java.util.List;

public interface HubService {
    boolean isHubOwnedByUser(Long hubId);
    Hub create(double latitude, double longitude, String token);

    List<Hub> getAllWithSensors();

    List<Hub> getAll(int page);

    Long getCount();

    Hub getById(Long hubId);

    Hub update(Long hubId, double latitude, double longitude, Long userId);

    void delete(Long hubId, Long userId);

    Hub addSensorToHub(Long hubId, Long sensorId);

    List<Sensor> getSensorsUpdatedSinceForHub(Hub hub, LocalDateTime timestamp);

    boolean isValidHubToken(String hubToken);

    List<Long> getSensorIdsUpdatedSinceForHub(Hub hub, LocalDateTime lastRetrievalTimestamp);
}
