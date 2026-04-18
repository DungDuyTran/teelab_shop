package com.example.demo.dto.reponse;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class ProductResponse {
    private Long id;
    @Schema(description = "Tên đầy đủ của sản phẩm")
    private String name;
    @Schema(description = "Gía bán của từng sản phẩm")
    private Double price;
    @Schema(description = "Tên của danh mục sản phẩm")
    private String categoryName;
}
