package com.useche.jonathan.ecommerce.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
//import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.useche.jonathan.ecommerce.entity.State;

//@CrossOrigin("http://localhost:4200")
@RepositoryRestResource
public interface StateRepository extends JpaRepository<State, Integer> //Spring data jpa
{
	List<State> findByCountryId(int id);
	
	List<State> findByCountryCode(@Param("code") String code);
}
