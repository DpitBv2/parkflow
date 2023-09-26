package com.example.parkflow.Controller;

import com.example.parkflow.Domain.User;
import com.example.parkflow.Service.ShopService;
import com.example.parkflow.Service.UserService;
import com.example.parkflow.Utils.ResponseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/shop")
public class ShopController {
    private final ShopService shopService;
    private final UserService userService;

    @Autowired
    public ShopController(ShopService shopService, UserService userService) {
        this.shopService = shopService;
        this.userService = userService;
    }
    @PostMapping("/purchase")
    public ResponseEntity<String> purchaseItems(
            @RequestParam int numberOfHubs,
            @RequestParam int numberOfSensors,
            Authentication authentication
    ) {
        User user = userService.get((String) authentication.getPrincipal());
        String userEmail = user.getEmail();
        userService.changeUserRoleByEmail(userEmail, "CUSTOMER");
        int totalBought = shopService.purchaseHubsAndSensors(userEmail, numberOfHubs, numberOfSensors);
        return ResponseEntity.ok("Purchase successful. Total hubs and sensors bought: " + totalBought);
    }
}
