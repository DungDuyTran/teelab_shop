package com.example.demo.service;

import com.example.demo.dto.reponse.CategoryResponse;
import com.example.demo.dto.request.CategoryRequest;
import com.example.demo.entity.Category;

public interface CategoryService extends BaseService<Category, Long, CategoryRequest, CategoryResponse> {

}