package com.useche.jonathan.ecommerce.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

//import org.hibernate.mapping.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.sun.xml.bind.v2.runtime.unmarshaller.UnmarshallingContext.State;
import com.useche.jonathan.ecommerce.entity.Country;
import com.useche.jonathan.ecommerce.entity.Order;
import com.useche.jonathan.ecommerce.entity.Product;
import com.useche.jonathan.ecommerce.entity.ProductCategory;

@Configuration
public class DataRestConfig  implements RepositoryRestConfigurer
{
	@Value("${allowed.origins}")
	private String[] allowedOrigins;
	
	@Autowired
	private EntityManager entityManager;
	

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors)
	{
		
		HttpMethod[] unsupportedConnections = {HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.PATCH};
		
		
		// Disable methods for ProductCategory: POST, PUT, DELETE, PATCH
		disableHttpConnections(config, ProductCategory.class, unsupportedConnections);
		
		// Disable methods for Product: POST, PUT, DELETE, PATCH
		disableHttpConnections(config, Product.class, unsupportedConnections);
		
		// Disable methods for Country: POST, PUT, DELETE, PATCH
		disableHttpConnections(config, Country.class, unsupportedConnections);
		
		// Disable methods for State: POST, PUT, DELETE, PATCH
		disableHttpConnections(config, State.class, unsupportedConnections);
		
		// Disable methods for Order: POST, PUT, DELETE, PATCH
		disableHttpConnections(config, Order.class, unsupportedConnections );
		
		
		//call an internal helper method
		exposedId(config);		
		
		// configure cors mapping
		cors.addMapping(config.getBasePath() + "/**").allowedOrigins(allowedOrigins);
	}
	
	
	private void disableHttpConnections(RepositoryRestConfiguration config, Class<?> entity, HttpMethod[] unsupportedConnections)
	{	
		//disable HTTP connections for Class entityClass: POST, PUT, DELETE
		config.getExposureConfiguration()
		.forDomainType(entity)
		.withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedConnections))
		.withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedConnections));		
	}
	
	private void exposedId(RepositoryRestConfiguration config)
	{
		// expose entity ids
		
		
		// get list of all entity classes from the entity manager
		Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
		
		// create an array of the entity types
		List<Class<?>> entityClasses = new ArrayList<>();
		
		// get the entity types for the entities
		for(EntityType<?> entity: entities)
		{
			entityClasses.add(entity.getJavaType());
		}
		
		// expose the entity ids for the array of entity/domain types
		Class<?>[] domainTypes = entityClasses.toArray(new Class[0]);
		config.exposeIdsFor(domainTypes);	
	}
}
