package com.example.parkflow.Service;

import com.example.parkflow.Controller.DTO.DataDTO;
import com.example.parkflow.Domain.Hub;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface HubService {
    boolean isHubOwnedByUser(Long hubId);

    Hub create(double latitude, double longitude);

    List<Hub> getAllWithSensors();

    List<Hub> getAll(int page);

    Long getCount();

    Hub getById(Long hubId);

    Hub update(Long hubId, double latitude, double longitude, Long userId);

    void delete(Long hubId, Long userId);

    Hub addSensorToHub(Long hubId, Long sensorId);

    boolean isValidHubToken(String hubToken);

    List<DataDTO> getSensorIdsUpdatedSinceForHub(Hub hub, LocalDateTime lastRetrievalTimestamp);

    Hub getHubByToken(String token);

    Hub setHubToken(Long hubId, String token, Long userId);

    Hub addSensorToHubByToken(String token, Long sensorId);
}
