package com.example.parkflow.Service;

import com.example.parkflow.Domain.Authority;
import com.example.parkflow.Domain.User;

import java.util.Set;

public interface UserService {
    void create(
            String username,
            String firstName,
            String lastName,
            String email,
            String password,
            Set<Authority> authorities
    );

    boolean exists(String username);

    User get(Long id);
    User get(String username);

    Authority getUserAuthority();

    void update(User user);
}
