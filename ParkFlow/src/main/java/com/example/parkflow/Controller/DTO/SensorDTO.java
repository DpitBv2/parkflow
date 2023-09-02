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

    public SensorDTO(Sensor sensor) {
        this.id = sensor.getId();
        this.latitude = sensor.getLatitude();
        this.longitude = sensor.getLongitude();
        this.address = sensor.getAddress();
    }
}
