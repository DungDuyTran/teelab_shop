package com.example.demo.service;

import com.example.demo.dto.request.CarRequest;
import com.example.demo.dto.response.CarResponse;
import com.example.demo.entity.Car;

public interface CarService extends BaseService<Car, Long, CarRequest, CarResponse> {
}