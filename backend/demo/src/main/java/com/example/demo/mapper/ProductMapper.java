package com.example.demo.mapper;

import com.example.demo.dto.reponse.ProductResponse;
import com.example.demo.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring") // Để Spring Boot có thể quản lý và Inject như một Bean
public interface ProductMapper {

    // Ánh xạ trường name của Category vào trường categoryName' của DTO
    @Mapping(source = "category.name", target = "categoryName")
    ProductResponse toProductResponse(Product product);
}