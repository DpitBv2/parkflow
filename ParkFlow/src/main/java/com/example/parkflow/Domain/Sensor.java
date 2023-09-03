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

    @ManyToOne
    private Hub hub;

    public Sensor() {

    }

    public enum State {
        ACTIVE, INACTIVE, RESERVED
    }
    public Sensor(double latitude, double longitude, Address address) {
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
    public Hub getHub() {
        return hub;
    }

    public void setHub(Hub hub) {
        this.hub = hub;
    }

    @Override
    public String toString() {
        return "Sensor{" +
                "id='" + id + '\'' +
                ", state='" + state + '\'' +
                ", currentState='" + currentState + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", createdAt=" + createdAtTimestamp +
                ", updatedAt=" + updatedAtTimestamp +
                ", address=" + address +
                '}';
    }
}