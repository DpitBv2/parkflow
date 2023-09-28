package com.example.parkflow.Controller;

import com.example.parkflow.Domain.User;
import com.example.parkflow.Service.Impl.ShopServiceImpl;
import com.example.parkflow.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/shop")
public class ShopController {
    private final ShopServiceImpl shopService;
    private final UserService userService;

    @Autowired
    public ShopController(ShopServiceImpl shopService, UserService userService) {
        this.shopService = shopService;
        this.userService = userService;
    }
    @PostMapping("/purchase")
    public ResponseEntity<String> purchaseItems(
            @RequestParam int numberOfHubs,
            @RequestParam int numberOfSensors,
            @RequestParam(required = false) List<String> hubTokens, // Optional list of hub tokens
            Authentication authentication
    ) {
        User user = userService.get((String) authentication.getPrincipal());
        String userEmail = user.getEmail();
        userService.changeUserRoleByEmail(userEmail, "CUSTOMER");

        if (numberOfHubs > 0 && (hubTokens == null || hubTokens.size() != numberOfHubs)) {
            // If numberOfHubs is not 0, require hubTokens for each hub
            return ResponseEntity.badRequest().body("Hub tokens are required for each hub being purchased.");
        }

        int totalBought = shopService.purchaseHubsAndSensors(userEmail, numberOfHubs, numberOfSensors, hubTokens);

        return ResponseEntity.ok("Purchase successful. Total hubs and sensors bought: " + totalBought);
    }
}
