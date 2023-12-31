package com.example.parkflow.Service.Impl;

import com.example.parkflow.Controller.DTO.HubDTO;
import com.example.parkflow.Controller.DTO.SensorDTO;
import com.example.parkflow.Domain.Address;
import com.example.parkflow.Domain.Hub;
import com.example.parkflow.Domain.Sensor;
import com.example.parkflow.Domain.User;
import com.example.parkflow.Repository.UserRepository;
import com.example.parkflow.Service.HubService;
import com.example.parkflow.Service.SensorService;
import com.example.parkflow.Service.ShopService;
import com.example.parkflow.Utils.ResponseException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShopServiceImpl implements ShopService {

    private UserRepository userRepository;
    private SensorService sensorService;
    private HubService hubService;

    public ShopServiceImpl(UserRepository userRepository, SensorService sensorService, HubService hubService) {
        this.userRepository = userRepository;
        this.sensorService = sensorService;
        this.hubService = hubService;
    }

    @Override
    public int purchaseHubsAndSensors(String userEmail, int numberOfHubs, int numberOfSensors) {
        User user = userRepository.findByEmail(userEmail).orElse(null);
        if (user == null) {
            throw new ResponseException("User not found.", HttpStatus.NOT_FOUND);
        }
        int totalBought = 0;

        for (int i = 0; i < numberOfHubs; i++) {
            HubDTO hubDTO = new HubDTO();
            hubDTO.setLatitude(0.0); // Set latitude as needed
            hubDTO.setLongitude(0.0); // Set longitude as needed
            double latitude = hubDTO.getLatitude();
            double longitude = hubDTO.getLongitude();
            Hub createdHub = hubService.create(latitude, longitude);
            user.addHub(createdHub);
            if (createdHub != null) {
                totalBought++;
            }
        }   

        for (int i = 0; i < numberOfSensors; i++) {
            Sensor createdSensor = sensorService.create(0, 0, null, true, null, false);
            user.addSensor(createdSensor);

            if (createdSensor != null) {
                totalBought++;
            }
        }
        userRepository.save(user);
        return totalBought;
    }
}
