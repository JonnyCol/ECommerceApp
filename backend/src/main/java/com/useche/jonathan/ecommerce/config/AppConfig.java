package com.useche.jonathan.ecommerce.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AppConfig implements WebMvcConfigurer 
{
	@Value("${allowed.origins}")
	private String[] allowedOrigins;
	
	@Value("${spring.data.rest.base-path}")
	private String basePath;

	// Configure "global" cross origin request processing.
	// The configured CORSmappings apply to annotated controllers, 
	// functional endpoints, and static resources. 
	@Override
	public void addCorsMappings(CorsRegistry cors) 
	{
		// set up cors mapping
		cors.addMapping(basePath + "/**").allowedOrigins(allowedOrigins);
	}
}
