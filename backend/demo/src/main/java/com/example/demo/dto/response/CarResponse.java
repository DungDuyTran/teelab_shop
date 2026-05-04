package com.example.demo.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CarResponse {
    private Long id;
    private String name;
    private String brand;
    private Double price;
    private Double salePrice;
    private Integer stockQuantity;
    private String description;
    private String imageUrl;
    private String modelUrl;
    private String color;
    private Long categoryId;
    private String categoryName;
}