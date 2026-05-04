package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cars")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    // Thương hiệu xe
    private String brand;

    // Giá gốc
    private Double price;

    // Giá khuyến mãi (Có thể null nếu xe không được giảm giá)
    private Double salePrice;

    // Số lượng tồn kho (Bắt buộc phải có để trừ đi khi khách thanh toán)
    @Column(nullable = false, columnDefinition = "integer default 0")
    private Integer stockQuantity;

    @Column(columnDefinition = "TEXT")
    private String description;

    // Ảnh đại diện dạng 2D (Thay thế cho cái icon mặc định trên giao diện)
    private String imageUrl;

    // Đường dẫn file 3D (.glb)
    private String modelUrl;

    // Màu sơn mặc định
    private String color;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
}