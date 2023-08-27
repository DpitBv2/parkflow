package com.example.parkflow.Controller.DTO;

import com.example.parkflow.Domain.ParkFlowUser;
import com.example.parkflow.Domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRoleDTO extends UserDTO {
    private ParkFlowUser.UserRole role;

    public UserRoleDTO(User user, ParkFlowUser.UserRole role) {
        super(user);
        this.role = role;
    }
}
