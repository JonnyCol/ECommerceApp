package com.useche.jonathan.ecommerce.entity;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


@Entity
@Table(name="product")
public class Product 
{
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="sku")
	private String sku;
	
	@Column(name="name")
	private String name;
	
	@Column(name="description")
	private String description;
	
	@Column(name="unit_price")
	private BigDecimal unitPrice;
	
	@Column(name="image_url")
	private String imageUrl;
	
	@Column(name="active")
	private boolean active;
	
	@Column(name="units_in_stock")
	private int unitsInStock;
	
	@Column(name="date_created")
	@CreationTimestamp
	private Date dateCreated;
	
	@Column(name="last_updated")
	@UpdateTimestamp
	private Date lastUpdated;
	
	@ManyToOne
	@JoinColumn(name="category_id", nullable=false)
	private ProductCategory category;
	
	//@ManyToOne(cascade=CascadeType.ALL, mappedBy="product_id")
	//private Set<Product> products;
	
	
	public Product()
	{
		
	}

	public Product(String sku, String name, String description, BigDecimal unitPrice, String imageUrl, boolean active,
			       int unitsInStock, Date dateCreated, Date lastUpdated) 
	{
		this.sku = sku;
		this.name = name;
		this.description = description;
		this.unitPrice = unitPrice;
		this.imageUrl = imageUrl;
		this.active = active;
		this.unitsInStock = unitsInStock;
		this.dateCreated = dateCreated;
		this.lastUpdated = lastUpdated;
		//this.categoryId = categoryId;
	}

	
	public Long getId() 
	{
		return id;
	}

	public void setId(Long id) 
	{
		this.id = id;
	}

	public String getSku() 
	{
		return sku;
	}

	public void setSku(String sku) 
	{
		this.sku = sku;
	}

	public String getName() 
	{
		return name;
	}

	public void setName(String name) 
	{
		this.name = name;
	}

	public String getDescription() 
	{
		return description;
	}

	public void setDescription(String description)
	{
		this.description = description;
	}

	public BigDecimal getUnitPrice() 
	{
		return unitPrice;
	}

	public void setUnitPrice(BigDecimal unitPrice) 
	{
		this.unitPrice = unitPrice;
	}

	public String getImageUrl() 
	{
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) 
	{
		this.imageUrl = imageUrl;
	}

	public boolean getActive()
	{
		return active;
	}

	public void setActive(boolean active) 
	{
		this.active = active;
	}

	public int getUnitsInStock() 
	{
		return unitsInStock;
	}

	public void setUnitsInStock(int unitsInStock) 
	{
		this.unitsInStock = unitsInStock;
	}

	public Date getDateCreated() 
	{
		return dateCreated;
	}

	public void setDateCreated(Date dateCreated) 
	{
		this.dateCreated = dateCreated;
	}

	public Date getLastUpdated()
	{
		return lastUpdated;
	}

	public void setLastUpdated(Date lastUpdated) 
	{
		this.lastUpdated = lastUpdated;
	}

	//public long getCategoryId() 
	//{
		//return categoryId;
	//}

	//public void setCategoryId(Long categoryId)
	//{
		//this.categoryId = categoryId;
	//}

	public ProductCategory getCategory() 
	{
		return category;
	}

	public void setCategory(ProductCategory category) 
	{
		this.category = category;
	}	
}
