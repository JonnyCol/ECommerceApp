package com.useche.jonathan.ecommerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import com.okta.spring.boot.oauth.Okta;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter
{

	@Override
	protected void configure(HttpSecurity http) throws Exception 
	{
	    // Protect endpoints  /api/orders
		http.authorizeRequests()
		   .antMatchers("/api/orders/**") // ** ->subfolders scanning
		   .authenticated() // access only for authenticated users
		   .and()
		   .oauth2ResourceServer()
		   .jwt(); // enables JWT-encoded bearer token support
		
		// add cors filters
		http.cors();
		
		// force a non-empty response body for 401 responses
		Okta.configureResourceServer401ResponseBody(http);
		
		// disable CSRF since we are not using cookies for session tracking
		http.csrf().disable();
		
	}
	

}
