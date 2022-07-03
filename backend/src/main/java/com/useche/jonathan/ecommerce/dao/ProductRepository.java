package com.useche.jonathan.ecommerce.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
//import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.useche.jonathan.ecommerce.entity.Product;

//@CrossOrigin("http://localhost:4200")
@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product,Long>
{
	// Provide custom query using @Query
	// to modify later on...
	// behind scenes:
	// SELECT * FROM product WHERE category_id=?
	Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);
	
	//SELECT * FROM Product p WHERE p.name LIKE CONCAT('%', :name, '%') 
	Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);

}
