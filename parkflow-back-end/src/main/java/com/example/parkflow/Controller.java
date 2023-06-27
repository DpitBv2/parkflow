package com.example.parkflow;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    @RequestMapping(path="/")
    public String message(){
        return "Hello World!";
    }
}
