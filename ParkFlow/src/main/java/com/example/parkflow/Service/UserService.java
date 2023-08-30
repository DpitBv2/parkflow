package com.example.parkflow.Service;

import com.example.parkflow.Domain.Authority;
import com.example.parkflow.Domain.User;

import java.util.Set;

public interface UserService {
    void create(
            String firstName,
            String lastName,
            String email,
            String password,
            String phoneNumber,
            Set<Authority> authorities
    );

    boolean exists(String email);

    User get(Long id);
    User get(String email);

    Authority getUserAuthority();

    void update(User user);
}
