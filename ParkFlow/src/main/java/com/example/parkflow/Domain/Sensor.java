package com.example.parkflow.Domain;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

@Entity
public class Sensor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long hubId;
    private Boolean state;
    private Boolean currentState;
    private double latitude;
    private double longitude;
    private Timestamp createdAt;
    public Sensor() {

    }
    public Sensor(Long id, Long hubId, Boolean state, Boolean currentState,
                  double latitude, double longitude, Timestamp createdAt) {
        this.id = id;
        this.hubId = hubId;
        this.state = state;
        this.currentState = currentState;
        this.latitude = latitude;
        this.longitude = longitude;
        this.createdAt = createdAt;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getHubId() {
        return hubId;
    }

    public void setHubId(Long hubId) {
        this.hubId = hubId;
    }

    public Boolean getState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    public Boolean getCurrentState() {
        return currentState;
    }

    public void setCurrentState(Boolean currentState) {
        this.currentState = currentState;
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

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "Sensor{" +
                "id='" + id + '\'' +
                ", hubId='" + hubId + '\'' +
                ", state='" + state + '\'' +
                ", currentState='" + currentState + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", createdAt=" + createdAt +
                '}';
    }
}