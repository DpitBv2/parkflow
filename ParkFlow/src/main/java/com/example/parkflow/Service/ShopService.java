package com.example.parkflow.Service;

import java.util.List;

public interface ShopService {

    int purchaseHubsAndSensors(String userEmail, int numberOfHubs, int numberOfSensors, List<String> hubTokens);
}
