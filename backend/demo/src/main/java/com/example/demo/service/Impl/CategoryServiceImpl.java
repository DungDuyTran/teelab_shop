package com.example.demo.service.Impl;

import com.example.demo.dto.reponse.CategoryResponse;
import com.example.demo.dto.request.CategoryRequest;
import com.example.demo.entity.Category;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl extends BaseServiceImpl<Category, Long, CategoryRequest, CategoryResponse>
        implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    protected JpaRepository<Category, Long> getRepository() {
        return categoryRepository;
    }

    @Override
    protected CategoryResponse mapToResponse(Category entity) {
        CategoryResponse res = new CategoryResponse();
        res.setId(entity.getId());
        res.setName(entity.getName());
        return res;
    }

    @Override
    protected Category mapToEntity(CategoryRequest request) {
        Category category = new Category();
        category.setName(request.getName());
        return category;
    }

    @Override
    protected void updateEntity(CategoryRequest request, Category entity) {
        entity.setName(request.getName());
    }
}