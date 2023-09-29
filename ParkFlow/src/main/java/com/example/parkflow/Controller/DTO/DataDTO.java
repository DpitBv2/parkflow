package com.example.parkflow.Controller.DTO;

import lombok.*;

@Getter
@Setter
public class DataDTO {
    private Long sensorId;
    private Boolean isLifted;

    public DataDTO(Long sensorId, Boolean isLifted) {
        this.isLifted = isLifted;
        this.sensorId = sensorId;
    }
}
