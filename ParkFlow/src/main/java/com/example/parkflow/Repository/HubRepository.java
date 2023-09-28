package com.example.parkflow.Repository;

import com.example.parkflow.Domain.Hub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HubRepository extends JpaRepository<Hub, Long> {
    Optional<Hub> findByToken(String token);
    boolean existsByToken(String token);
}