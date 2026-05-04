package com.example.demo.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CarRequest {
    @NotBlank(message = "Tên xe không được để trống")
    private String name;

    private String brand;

    @NotNull(message = "Giá gốc không được để trống")
    @Min(value = 0, message = "Giá không được âm")
    private Double price;

    @Min(value = 0, message = "Giá khuyến mãi không được âm")
    private Double salePrice;

    @NotNull(message = "Vui lòng nhập số lượng tồn kho")
    @Min(value = 0, message = "Số lượng tồn kho không hợp lệ")
    private Integer stockQuantity;

    private String description;

    private String imageUrl;

    private String modelUrl;

    private String color;

    @NotNull(message = "Phải chọn danh mục xe")
    private Long categoryId;
}