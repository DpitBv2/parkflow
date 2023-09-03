package com.example.parkflow.Controller.DTO;

import com.example.parkflow.Domain.Hub;

import java.util.List;
import java.util.stream.Collectors;

public class HubDTO {
    private Long hubId;
    private double latitude;
    private double longitude;
    private List<SensorDTO> sensors;

    public HubDTO(Hub hub) {
        this.hubId = hub.getHubId();
        this.latitude = hub.getLatitude();
        this.longitude = hub.getLongitude();
        this.sensors = hub.getSensors().stream()
                .map(SensorDTO::new)
                .collect(Collectors.toList());
    }

    public Long getHubId() {
        return hubId;
    }

    public void setHubId(Long hubId) {
        this.hubId = hubId;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public List<SensorDTO> getSensors() {
        return sensors;
    }

    public void setSensors(List<SensorDTO> sensors) {
        this.sensors = sensors;
    }
}