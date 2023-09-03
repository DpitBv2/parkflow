package com.example.parkflow.Domain;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "hubs")
public class Hub {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hubId;
    private double latitude;
    private double longitude;

    @OneToMany(mappedBy = "hub")
    private List<Sensor> sensors = new ArrayList<>();

    public Hub() {
    }
    public Hub(double latitude, double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
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

    public List<Sensor> getSensors() {
        return sensors;
    }

    public void setSensors(List<Sensor> sensors) {
        this.sensors = sensors;
    }

    public void addSensor(Sensor sensor) {
        sensors.add(sensor);
        sensor.setHub(this);
    }
    public void removeSensor(Sensor sensor) {
        sensors.remove(sensor);
        sensor.setHub(null);
    }

    @Override
    public String toString() {
        return "Hub{" +
                "hubId='" + hubId + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                '}';
    }
}