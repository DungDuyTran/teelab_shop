package com.example.demo.controller;

import com.example.demo.dto.request.CategoryRequest;
import com.example.demo.dto.response.CategoryResponse;
import com.example.demo.entity.Category;
import com.example.demo.service.BaseService;
import com.example.demo.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController extends BaseController<Category, Long, CategoryRequest, CategoryResponse> {

    private final CategoryService categoryService;

    @Override
    protected BaseService<Category, Long, CategoryRequest, CategoryResponse> getService() {
        return categoryService;
    }
}