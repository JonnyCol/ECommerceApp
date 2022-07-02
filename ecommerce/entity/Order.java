package com.useche.jonathan.ecommerce.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="orders")
public class Order 
{
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column(name="tracking_number")
	private String trackingNumber;
	
	@Column(name="total_price")
	private double totalPrice;
	
	@Column(name="total_quantity")
	private int totalQuantity;
	
	@Column(name="status")
	private String status;
	
	@Column(name="date_created")
	@CreationTimestamp
	private Date dateCreated;
	
	@Column(name="last_updated")
	@UpdateTimestamp
	private Date lastUpdated;
	
	@ManyToOne
	@JoinColumn(name="customer_id")
	private Customer customer;
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="billing_address_id", referencedColumnName="id")
	private Address billingAddress;
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="shipping_address_id", referencedColumnName="id")
	private Address shippingAddress;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="order")
	private Set<OrderContents> orderContents;
	
	
	public Order()
	{
		orderContents =  new HashSet<>();	
	}
	

	public int getId() 
	{
		return id;
	}

	public void setId(int id) 
	{
		this.id = id;
	}

	public String getTrackingNumber() 
	{
		return trackingNumber;
	}

	public void setTrackingNumber(String trackingNumber)
	{
		this.trackingNumber = trackingNumber;
	}

	public double getTotalPrice() 
	{
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) 
	{
		this.totalPrice = totalPrice;
	}

	public int getTotalQuantity() 
	{
		return totalQuantity;
	}

	public void setTotalQuantity(int totalQuantity) 
	{
		this.totalQuantity = totalQuantity;
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

	public Customer getCustomer() 
	{
		return customer;
	}

	public void setCustomer(Customer customer) 
	{
		this.customer = customer;
	}

	public Address getBillingAddress() 
	{
		return billingAddress;
	}

	public void setBillingAddress(Address billingAddress) 
	{
		this.billingAddress = billingAddress;
	}

	public Address getShippingAddress() 
	{
		return shippingAddress;
	}

	public void setShippingAddress(Address shippingAddress) 
	{
		this.shippingAddress = shippingAddress;
	}

	public String getStatus() 
	{
		return status;
	}

	public void setStatus(String status) 
	{
		this.status = status;
	}

	public Set<OrderContents> getOrderContents()
	{
		return orderContents;
	}

	public void setOrderContents(Set<OrderContents> orderContents) 
	{
		this.orderContents = orderContents;
	}

	public void add(OrderContents item) 
	{
		if(item != null)
		{
			if(orderContents == null)
			{
				orderContents = new HashSet<>();
			}
			orderContents.add(item);
			item.setOrder(this);
			
		}		
	}		
}