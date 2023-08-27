package com.example.parkflow.Repository;

import com.example.parkflow.Domain.Authority;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface AuthorityRepository extends CrudRepository<Authority, Long> {
    Optional<Authority> findByAuthority(String authority);
}
