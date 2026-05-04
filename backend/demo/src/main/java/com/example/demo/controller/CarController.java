package com.example.demo.controller;

import com.example.demo.dto.request.CarRequest;
import com.example.demo.dto.response.CarResponse;
import com.example.demo.entity.Car;
import com.example.demo.service.BaseService;
import com.example.demo.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "*", allowCredentials = "true")

public class CarController extends BaseController<Car, Long, CarRequest, CarResponse> {

    private final CarService carService;

    @Override
    protected BaseService<Car, Long, CarRequest, CarResponse> getService() {
        return carService;
    }
}