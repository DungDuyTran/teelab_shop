package com.example.demo.service.Impl;

import com.example.demo.dto.reponse.ProductResponse;
import com.example.demo.dto.request.ProductRequest;
import com.example.demo.entity.Category;
import com.example.demo.entity.Product;
import com.example.demo.mapper.ProductMapper;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl extends BaseServiceImpl<Product, Long, ProductRequest, ProductResponse>
        implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    @Override
    protected JpaRepository<Product, Long> getRepository() {
        return productRepository;
    }

    @Override
    protected ProductResponse mapToResponse(Product entity) {
        return productMapper.toProductResponse(entity);
    }

    @Override
    protected Product mapToEntity(ProductRequest request) {
        // Logic tìm Category ông giữ nguyên vì đây là đặc thù của Product
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Lỗi: Không tìm thấy danh mục id = " + request.getCategoryId()));

        Product product = new Product();
        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setCategory(category);
        return product;
    }

    @Override
    protected void updateEntity(ProductRequest request, Product entity) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Lỗi: Danh mục không hợp lệ"));

        entity.setName(request.getName());
        entity.setPrice(request.getPrice());
        entity.setCategory(category);
    }

}