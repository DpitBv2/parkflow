package com.example.parkflow.Service.Impl;

import com.example.parkflow.Domain.Authority;
import com.example.parkflow.Domain.User;
import com.example.parkflow.Repository.AuthorityRepository;
import com.example.parkflow.Repository.UserRepository;
import com.example.parkflow.Security.PasswordEncoder;
import com.example.parkflow.Service.UserService;
import com.example.parkflow.Utils.ResponseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private Authority userAuthority;

    @Autowired
    public UserServiceImpl(
            UserRepository userRepository,
            AuthorityRepository authorityRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;

        authorityRepository.findByAuthority("user")
                .ifPresent(authority -> userAuthority = authority);
    }
    @Override
    public void create(
            String firstName,
            String lastName,
            String email,
            String password,
            String phoneNumber,
            Set<Authority> authorities
    ) {
        if (
                email.isEmpty() ||
                        firstName.isEmpty() ||
                        lastName.isEmpty())
            throw new ResponseException("Invalid data");
        if (userRepository.existsByEmail(email))
            throw new ResponseException("Email address is already used.");
        if (password.length() < 8)
            throw new ResponseException("Password should be longer then 8 characters.");
        var encodedPassword = passwordEncoder.encode(password);
        var user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPassword(encodedPassword);
        user.setPhoneNumber(phoneNumber);
        Authority userRole = getAuthority();
        user.getAuthorities().add(userRole);
        user.getAuthorities().addAll(authorities);
        userRepository.save(user);
    }

    @Override
    public boolean exists(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User get(Long id) {
        var user = userRepository.findById(id);
        if (user.isEmpty())
            throw new ResponseException("User not found.", HttpStatus.NOT_FOUND);
        return user.get();
    }

    @Override
    public User get(String email) {
        var user = userRepository.findByEmail(email);
        if (user.isEmpty())
            throw new ResponseException("User not found.", HttpStatus.NOT_FOUND);
        return user.get();
    }

    @Override
    public void update(User user) {
        if (
                user.getEmail().isEmpty() ||
                        user.getFirstName().isEmpty() ||
                        user.getLastName().isEmpty())
            throw new ResponseException("Invalid data");
        if (userRepository.existsByEmail(user.getEmail()) && !userRepository.findByEmail(user.getEmail()).get().getId().equals(user.getId()))
            throw new ResponseException("Email is already used.");
        userRepository.save(user);
    }

    @Override
    public Authority getAuthority() {
        return userAuthority;
    }

    @Override
    public void changeUserRoleByEmail(String email, String newRole) throws ResponseException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseException("User not found.", HttpStatus.NOT_FOUND));
        Authority newAuthority = new Authority(newRole);
//        user.getAuthorities().clear();
        user.getAuthorities().add(newAuthority);
        System.out.println(newAuthority);
        userRepository.save(user);
    }

    @Override
    public Authority getUserAuthorityByEmail(String email) throws ResponseException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseException("User not found.", HttpStatus.NOT_FOUND));
        return user.getAuthorities().stream()
                .findFirst()
                .orElseThrow(() -> new ResponseException("Role not found.", HttpStatus.NOT_FOUND));
    }
}