package com.useche.jonathan.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.useche.jonathan.ecommerce.entity.Country;

//@CrossOrigin("http://localhost:4200")
//@RepositoryRestResource(collectionResourceRel="countries", path="countries")
@RepositoryRestResource
public interface CountryRepository extends JpaRepository<Country, Integer> 
{

}
