package com.example.parkflow.Domain;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.UUID;

@Entity
@Table(name = "sensors")
public class Sensor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String hubId;

    @Enumerated(EnumType.STRING)
    private State state;
    @Enumerated(EnumType.STRING)
    private State currentState;
    private double latitude;
    private double longitude;
    private LocalDateTime createdAtTimestamp;

    public Sensor() {

    }

    public enum State {
        ACTIVE, INACTIVE, RESERVED
    }
    public Sensor(String hubId, State state, State currentState,
                  double latitude, double longitude) {
        this.hubId = hubId;
        this.state = state;
        this.currentState = currentState;
        this.latitude = latitude;
        this.longitude = longitude;
        this.createdAtTimestamp = LocalDateTime.now();
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHubId() {
        return hubId;
    }

    public void setHubId(String hubId) {
        this.hubId = hubId;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public State getCurrentState() {
        return currentState;
    }

    public void setCurrentState(State currentState) {
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

    public LocalDateTime getCreatedAtTimestamp() {
        return createdAtTimestamp;
    }

    public void setCreatedAtTimestamp(LocalDateTime createdAtTimestamp) {
        this.createdAtTimestamp = createdAtTimestamp;
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
                ", createdAt=" + createdAtTimestamp +
                '}';
    }
}