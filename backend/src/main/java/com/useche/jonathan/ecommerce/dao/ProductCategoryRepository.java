package com.useche.jonathan.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
//import org.springframework.web.bind.annotation.CrossOrigin;

import com.useche.jonathan.ecommerce.entity.ProductCategory;


//                        specify given data(name of JSON entry, /product-category) >> Will not make it plural
@RepositoryRestResource(collectionResourceRel="productCategory", path="product-category")
//@CrossOrigin("http://localhost:4200")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long>
{

}
