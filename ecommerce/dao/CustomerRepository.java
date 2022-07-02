package com.useche.jonathan.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.useche.jonathan.ecommerce.entity.Customer;

//@CrossOrigin("http://localhost:4200")
//@RepositoryRestResource
public interface CustomerRepository extends JpaRepository<Customer, Long>
{
	// SELECT * FROM Customer c WHERE c.email = email
	Customer findByEmail(String email);
}
