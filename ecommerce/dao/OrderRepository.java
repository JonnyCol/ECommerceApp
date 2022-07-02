package com.useche.jonathan.ecommerce.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.useche.jonathan.ecommerce.entity.Order;

@RepositoryRestResource
public interface OrderRepository extends JpaRepository<Order, Long> 
{
	// BEHIND SCENES:
	//
	// SELECT * FROM orders LEFT OUTER JOIN customer 
	// ON orders.customer_id=customer.id
	// WHERE customer.email=:email
	// ORDER BY orders.date_created DESC
	List<Order> findByCustomerEmailOrderByDateCreatedDesc(String email);
	
	//Page<Order> findByCustomerEmail(@Param("email") String email, Pageable pageable);
}
