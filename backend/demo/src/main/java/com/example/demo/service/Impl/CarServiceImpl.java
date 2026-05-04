package com.example.demo.service.Impl;

import com.example.demo.dto.request.CarRequest;
import com.example.demo.dto.response.CarResponse;
import com.example.demo.entity.Car;
import com.example.demo.entity.Category;
import com.example.demo.repository.CarRepository;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CarServiceImpl extends BaseServiceImpl<Car, Long, CarRequest, CarResponse>
        implements CarService {

    private final CarRepository carRepository;
    private final CategoryRepository categoryRepository;

    @Override
    protected JpaRepository<Car, Long> getRepository() {
        return carRepository;
    }

    // 1. ÁNH XẠ TỪ ENTITY SANG DTO (Để trả về cho Vue.js)
    @Override
    protected CarResponse mapToResponse(Car entity) {
        return CarResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .brand(entity.getBrand())                 // [MỚI] Thêm hãng xe
                .price(entity.getPrice())
                .salePrice(entity.getSalePrice())         // [MỚI] Thêm giá khuyến mãi
                .stockQuantity(entity.getStockQuantity()) // [MỚI] Thêm số lượng tồn kho
                .description(entity.getDescription())
                .imageUrl(entity.getImageUrl())           // [MỚI] Thêm ảnh 2D
                .modelUrl(entity.getModelUrl())
                .color(entity.getColor())
                .categoryId(entity.getCategory() != null ? entity.getCategory().getId() : null)
                .categoryName(entity.getCategory() != null ? entity.getCategory().getName() : "Không xác định")
                .build();
    }

    // 2. ÁNH XẠ TỪ DTO SANG ENTITY (Khi tạo mới xe - CREATE)
    @Override
    protected Car mapToEntity(CarRequest request) {
        Car car = Car.builder()
                .name(request.getName())
                .brand(request.getBrand())                 // [MỚI]
                .price(request.getPrice())
                .salePrice(request.getSalePrice())         // [MỚI]
                .stockQuantity(request.getStockQuantity()) // [MỚI]
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())           // [MỚI]
                .modelUrl(request.getModelUrl())
                .color(request.getColor())
                .build();

        // Gán Category cho Car
        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy Category với id: " + request.getCategoryId()));
            car.setCategory(category);
        }
        return car;
    }

    // 3. CẬP NHẬT ENTITY CÓ SẴN TỪ DTO (Khi sửa xe - UPDATE)
    @Override
    protected void updateEntity(CarRequest request, Car entity) {
        entity.setName(request.getName());
        entity.setBrand(request.getBrand());                 // [MỚI]
        entity.setPrice(request.getPrice());
        entity.setSalePrice(request.getSalePrice());         // [MỚI]
        entity.setStockQuantity(request.getStockQuantity()); // [MỚI]
        entity.setDescription(request.getDescription());
        entity.setImageUrl(request.getImageUrl());           // [MỚI] Giữ link ảnh mới
        entity.setModelUrl(request.getModelUrl());           // Giữ link 3D mới
        entity.setColor(request.getColor());

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy Category"));
            entity.setCategory(category);
        }
    }
}