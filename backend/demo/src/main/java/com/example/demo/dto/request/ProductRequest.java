package com.example.demo.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProductRequest {
    @NotBlank(message = "Tên không được trống")
    private String name;
    @Min(0)
    private Double price;
    private Long categoryId;
}
