package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String name;
    private Double price;

    @ManyToOne(fetch = FetchType.LAZY) // Tối ưu hiệu năng: Chỉ load Category khi cần
    @JoinColumn(name = "category_id")
    private Category category;

}
