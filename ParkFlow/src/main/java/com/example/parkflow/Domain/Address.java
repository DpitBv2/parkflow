package com.example.parkflow.Domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "address")
public class Address {
    @Id
    private Long id;
    private String street;
    private String city;
    private String country;
    private String region;
    private String postalCode;

    public Address() {

    }

    public Address(String street, String city, String country, String region, String postalCode, Sensor sensor) {
        this.street = street;
        this.city = city;
        this.country = country;
        this.region = region;
        this.postalCode = postalCode;
    }

    public Long getId() {
        return id;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    @Override
    public String toString() {
        return "Address{" +
                "id=" + id +
                ", street='" + street + '\'' +
                ", city='" + city + '\'' +
                ", country='" + country + '\'' +
                ", region='" + region + '\'' +
                ", postalCode='" + postalCode + '\'' +
                '}';
    }
}
