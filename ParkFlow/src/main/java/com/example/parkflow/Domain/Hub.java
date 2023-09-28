package com.example.parkflow.Domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "hubs")
public class Hub {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String token;
    private double latitude;
    private double longitude;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User owner;

    @OneToMany(mappedBy = "hub", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Sensor> sensors = new ArrayList<>();

    public Hub() {
    }
    public Hub(double latitude, double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
    public Long getId() {
        return id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setId(Long hubId) {
        this.id = hubId;
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

    public List<Sensor> getSensors() {
        return sensors;
    }

    public void setSensors(List<Sensor> sensors) {
        this.sensors = sensors;
    }

    public User getOwner() {
        return owner;
    }
    public void setOwner(User owner) {
        this.owner = owner;
    }

    public void addSensor(Sensor sensor) {
        sensors.add(sensor);
        sensor.setHub(this);
    }
    public void removeSensor(Sensor sensor) {
        sensors.remove(sensor);
        sensor.setHub(null);
    }
}