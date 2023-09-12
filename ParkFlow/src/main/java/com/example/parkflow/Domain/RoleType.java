package com.example.parkflow.Domain;

public enum RoleType {
    ADMIN("ADMIN"),
    USER("USER"),
    CUSTOMER("CUSTOMER");

    private final String roleName;

    RoleType(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleName() {
        return roleName;
    }
}