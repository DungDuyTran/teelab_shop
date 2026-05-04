package com.example.demo.service;

import com.example.demo.entity.Category;
import com.example.demo.dto.request.CategoryRequest;
import com.example.demo.dto.response.CategoryResponse;

public interface CategoryService extends BaseService<Category, Long, CategoryRequest, CategoryResponse> {
    // Thêm các logic riêng cho Category ở đây nếu BaseService không có
}