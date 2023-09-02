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
    private Long hubId;
    @Enumerated(EnumType.STRING)
    private State state;
    @Enumerated(EnumType.STRING)
    private State currentState;
    private double latitude;
    private double longitude;
    @Embedded
    private Address address;
    private LocalDateTime createdAtTimestamp;
    private LocalDateTime updatedAtTimestamp;

    public Sensor() {

    }

    public enum State {
        ACTIVE, INACTIVE, RESERVED
    }
    public Sensor(double latitude, double longitude, Address address) {
        this.hubId = null;
        this.state = State.ACTIVE;
        this.currentState = State.ACTIVE;
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
        this.createdAtTimestamp = LocalDateTime.now();
        this.updatedAtTimestamp = LocalDateTime.now();
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

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public LocalDateTime getCreatedAtTimestamp() {
        return createdAtTimestamp;
    }

    public void setCreatedAtTimestamp(LocalDateTime createdAtTimestamp) {
        this.createdAtTimestamp = createdAtTimestamp;
    }

    public LocalDateTime getUpdatedAtTimestamp() {
        return updatedAtTimestamp;
    }

    public void setUpdatedAtTimestamp(LocalDateTime updatedAtTimestamp) {
        this.updatedAtTimestamp = updatedAtTimestamp;
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