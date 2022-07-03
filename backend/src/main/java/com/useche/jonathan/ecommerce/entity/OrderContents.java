package com.useche.jonathan.ecommerce.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="order_contents")
public class OrderContents 
{
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column(name="quantity")
	private int quantity;
	
	@Column(name="unit_price")
	private double unitPrice;
	
	@Column(name="image_url")
	private String imageUrl;
	
	@ManyToOne
	@JoinColumn(name="order_id")
	private Order order;
	
	//@OneToMany
	//@JoinColumn(name="product_id", nullable=false)
	@Column(name="product_id")
	private int productId;
	
	
	
	
	public OrderContents()
	{
		
	}


	public int getId() 
	{
		return id;
	}


	public void setId(int id) 
	{
		this.id = id;
	}


	public int getQuantity() 
	{
		return quantity;
	}


	public void setQuantity(int quantity) 
	{
		this.quantity = quantity;
	}


	public double getUnitPrice() 
	{
		return unitPrice;
	}


	public void setUnitPrice(double unitPrice) 
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


	public Order getOrder() 
	{
		return order;
	}


	public void setOrder(Order order)
	{
		this.order = order;
	}


	public int getProductId() 
	{
		return productId;
	}


	public void setProductId(int productId) 
	{
		this.productId = productId;
	}
	
	

    /*
	public Product getProduct() 
	{
		return product;
	}


	public void setProduct(Product product) 
	{
		this.product = product;
	}*/
}
