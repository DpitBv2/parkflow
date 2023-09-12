package com.example.parkflow.Repository;

import com.example.parkflow.Domain.Hub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HubRepository extends JpaRepository<Hub, Long> {
}