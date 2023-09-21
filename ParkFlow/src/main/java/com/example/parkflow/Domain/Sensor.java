package com.example.parkflow.Domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.UUID;

@Entity
@Table(name = "sensors")
public class Sensor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double latitude;
    private double longitude;
    @Column(nullable = false)
    private Boolean available;
    @Embedded
    private Address address;
    private LocalDateTime createdAtTimestamp;
    private LocalDateTime updatedAtTimestamp;
    private LocalDateTime reservationStartTimestamp;
    private BigDecimal reservationPricePerHour;
    private Boolean lifted;

    private Long reservedByUserId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User owner;
    @ManyToOne
    @JsonBackReference
    private Hub hub;

    public Sensor() {

    }

    public Sensor(Double latitude, Double longitude, Address address) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
        this.createdAtTimestamp = LocalDateTime.now();
        this.updatedAtTimestamp = LocalDateTime.now();
        this.available = true;
        this.reservationPricePerHour = BigDecimal.valueOf(5);
        this.lifted = true;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Double getLatitude() {
        return latitude;
    }
    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }
    public Double getLongitude() {
        return longitude;
    }
    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }
    public boolean isAvailable() {
        return available;
    }
    public void setAvailable(boolean available) {
        this.available = available;
    }
    public BigDecimal getReservationPricePerHour() {
        return reservationPricePerHour;
    }
    public void setReservationPricePerHour(BigDecimal reservationPricePerHour) {
        this.reservationPricePerHour = reservationPricePerHour;
    }
    public void setLatitude(double latitude) {
        this.latitude = latitude;
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
    public User getOwner() {
        return owner;
    }
    public void setOwner(User owner) {
        this.owner = owner;
    }
    public Boolean getAvailable() {
        return available;
    }
    public void setAvailable(Boolean available) {
        this.available = available;
    }
    public Long getReservedByUserId() {
        return reservedByUserId;
    }
    public void setReservedByUserId(Long reservedByUserId) {
        this.reservedByUserId = reservedByUserId;
    }
    public LocalDateTime getReservationStartTimestamp() {
        return reservationStartTimestamp;
    }
    public void setReservationStartTimestamp(LocalDateTime reservationStartTimestamp) {
        this.reservationStartTimestamp = reservationStartTimestamp;
    }
    public boolean isLifted() {
        return lifted;
    }
    public void setLifted(boolean lifted) {
        this.lifted = lifted;
    }
}