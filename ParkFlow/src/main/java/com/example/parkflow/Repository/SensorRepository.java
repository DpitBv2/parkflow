package com.example.parkflow.Repository;

import com.example.parkflow.Domain.Hub;
import com.example.parkflow.Domain.Sensor;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SensorRepository extends JpaRepository<Sensor, Long> {
    @Query("SELECT s.id, s.lifted FROM Sensor s WHERE s.hub.id = :hubId AND s.updatedAtTimestamp > :timestamp")
    List<Long> findSensorIdsUpdatedSinceForHub(@Param("hubId") Long hubId, @Param("timestamp") LocalDateTime timestamp);
}