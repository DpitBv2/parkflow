package com.example.parkflow.Domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservations")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "sensorId", referencedColumnName = "id")
    private Sensor sensor;
    private Long userId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private BigDecimal cost;
    private String paymentMethod;
    @ManyToOne
    @JoinColumn(name = "userReservedId", referencedColumnName = "id")
    @JsonManagedReference
    private User user;

    public Reservation() {
    }

    public Reservation(
            Sensor sensor,
            Long userId,
            LocalDateTime startTime,
            LocalDateTime endTime,
            BigDecimal cost,
            String paymentMethod
    ) {
        this.sensor = sensor;
        this.userId = userId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.cost = cost;
        this.paymentMethod = paymentMethod;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Sensor getSensor() {
        return sensor;
    }

    public void setSensor(Sensor sensor) {
        this.sensor = sensor;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public BigDecimal getCost() {
        return cost;
    }

    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    @Override
    public String toString() {
        return "Reservation{" +
                "id=" + id +
                ", sensor=" + sensor +
                ", userId=" + userId +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", cost=" + cost +
                ", paymentMethod='" + paymentMethod + '\'' +
                '}';
    }
}
