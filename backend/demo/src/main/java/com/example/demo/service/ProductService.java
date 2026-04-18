package com.example.demo.service;

import com.example.demo.dto.reponse.ProductResponse;
import com.example.demo.dto.request.ProductRequest;
import com.example.demo.entity.Product;

public interface ProductService extends BaseService<Product, Long, ProductRequest, ProductResponse> {

}