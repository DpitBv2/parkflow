package com.example.parkflow.Domain;

import jakarta.persistence.Entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long sensorId;

    private Long userId;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private BigDecimal cost;

    public Reservation() {
    }

    public Reservation(
            Long sensorId,
            Long userId,
            LocalDateTime startTime,
            LocalDateTime endTime,
            BigDecimal cost
    ) {
        this.sensorId = sensorId;
        this.userId = userId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.cost = cost;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSensor() {
        return sensorId;
    }

    public void setSensor(Long sensorId) {
        this.sensorId = sensorId;
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
}
