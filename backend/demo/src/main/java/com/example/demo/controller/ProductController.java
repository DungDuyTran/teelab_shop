package com.example.demo.controller;

import com.example.demo.dto.reponse.ProductResponse;
import com.example.demo.dto.request.ProductRequest;
import com.example.demo.entity.Product;
import com.example.demo.service.BaseService;
import com.example.demo.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@Tag(name = "Sản phẩm", description = "Quản lý sản phẩm Dirtycoin")
@RequiredArgsConstructor
@ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Thành công"),
        @ApiResponse(responseCode = "404", description = "Không tìm thấy dữ liệu")
})
public class ProductController extends BaseController<Product, Long, ProductRequest, ProductResponse> {

    private final ProductService productService;

    @Override
    protected BaseService<Product, Long, ProductRequest, ProductResponse> getService() {
        return productService;
    }

    // CHỈ override những hàm nào ông muốn thêm @Operation đặc biệt
    @Override
    @Operation(summary = "Thêm mới sản phẩm")
    public ResponseEntity<ProductResponse> create(ProductRequest request) {
        return super.create(request);
    }

    @Override
    @Operation(summary = "Cập nhật sản phẩm")
    public ResponseEntity<ProductResponse> update(@PathVariable Long id, ProductRequest request) {
        return super.update(id, request);
    }
}