package com.useche.jonathan.ecommerce.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="product_category")
public class ProductCategory 
{
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="category_name")
	private String categoryName;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="category")
	private Set<Product> products;
	
	
	
	public ProductCategory()
	{
		
	}
	
	public ProductCategory(String categoryName) 
	{
		this.categoryName = categoryName;
	}
	

	public Long getId() 
	{
		return id;
	}

	public void setId(Long id) 
	{
		this.id = id;
	}

	public String getCategoryName() 
	{
		return categoryName;
	}

	public void setCategoryName(String categoryName)
	{
		this.categoryName = categoryName;
	}

	public Set<Product> getProducts() 
	{
		return products;
	}

	public void setProducts(Set<Product> products) 
	{
		this.products = products;
	}	
}
