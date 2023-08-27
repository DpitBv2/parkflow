package com.example.parkflow.Domain;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;

import java.util.Objects;

@Entity
@Table(name = "authorities")
public class Authority implements GrantedAuthority {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(nullable = false, unique = true)
        private Long id;

        @Column(nullable = false)
        private String authority;

        public Authority() {
        }

        public Authority(String authority) {
            this.authority = authority;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        @Override
        public String getAuthority() {
            return authority;
        }

        public void setAuthority(String authority) {
            this.authority = authority;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Authority authority1 = (Authority) o;
            return Objects.equals(id, authority1.id) && Objects.equals(authority, authority1.authority);
        }

        @Override
        public int hashCode() {
            return Objects.hash(id, authority);
        }

        @Override
        public String toString() {
            return "Authority{" +
                    "id=" + id +
                    ", authority='" + authority + '\'' +
                    '}';
        }
    }
