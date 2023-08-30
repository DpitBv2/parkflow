package com.example.parkflow.Repository;

import com.example.parkflow.Domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface UserRepository extends
        CrudRepository<User, Long>,
        PagingAndSortingRepository<User, Long>
{
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
}
