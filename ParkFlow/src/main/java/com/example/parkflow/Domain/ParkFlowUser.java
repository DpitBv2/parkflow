package com.example.parkflow.Domain;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "park_users")
public class ParkFlowUser {
    public enum UserRole {
        USER,
        ADMIN,
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @Column(nullable = false)
    @Enumerated(EnumType.ORDINAL)
    private UserRole userRole = UserRole.USER;

    @Column(nullable = false)
    private LocalDate createdAt = LocalDate.now();

    public ParkFlowUser() {
    }

    public ParkFlowUser(Long id, User user, UserRole userRole, LocalDate createdAt) {
        this.id = id;
        this.user = user;
        this.userRole = userRole;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }
}
