package com.example.parkflow.Controller.DTO;

import com.example.parkflow.Domain.Hub;
import lombok.*;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class HubDTO {
    private Long hubId;
    private double latitude;
    private double longitude;

    public HubDTO(Hub hub) {
        this.hubId = hub.getId();
        this.latitude = hub.getLatitude();
        this.longitude = hub.getLongitude();
    }
}