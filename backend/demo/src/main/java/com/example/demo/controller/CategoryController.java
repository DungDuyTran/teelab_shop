package com.example.demo.controller;

import com.example.demo.dto.reponse.CategoryResponse;
import com.example.demo.dto.request.CategoryRequest;
import com.example.demo.entity.Category;
import com.example.demo.service.BaseService;
import com.example.demo.service.CategoryService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/categories")
@Tag(name = "Danh mục", description = "Quản lý danh mục Dirtycoin")
@RequiredArgsConstructor
public class CategoryController extends BaseController<Category, Long, CategoryRequest, CategoryResponse> {

    private final CategoryService categoryService;

    @Override
    protected BaseService<Category, Long, CategoryRequest, CategoryResponse> getService() {
        return categoryService;
    }

    // XÓA sạch các hàm create, getAll cũ đi Dũng.
    // Thằng BaseController nó lo hết từ A-Z rồi!
}