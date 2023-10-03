package com.example.parkflow.Controller.DTO;

import com.example.parkflow.Domain.Address;
import com.example.parkflow.Domain.Sensor;
import lombok.*;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class SensorDTO {
    private Long id;
    private Double latitude;
    private Double longitude;
    private Address address;
    private Boolean available;
    private String name;
    private Boolean isElectric;

    public SensorDTO(Sensor sensor) {
        this.id = sensor.getId();
        this.latitude = sensor.getLatitude();
        this.longitude = sensor.getLongitude();
        this.address = sensor.getAddress();
        this.available = sensor.isAvailable();
        this.name = sensor.getName();
        this.isElectric = sensor.getIsElectric();
    }
}