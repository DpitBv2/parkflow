package com.example.parkflow.Repository;

import com.example.parkflow.Domain.Role;
import com.example.parkflow.Domain.RoleType;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(RoleType name);
}