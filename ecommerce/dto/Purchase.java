package com.useche.jonathan.ecommerce.dto;

import java.util.HashSet;
import java.util.Set;

import com.useche.jonathan.ecommerce.entity.Address;
import com.useche.jonathan.ecommerce.entity.Customer;
import com.useche.jonathan.ecommerce.entity.Order;
import com.useche.jonathan.ecommerce.entity.OrderContents;

public class Purchase 
{
	private Customer customer;
	private Address billingAddress;
	private Address shippingAddress;
	private Order order;
	private Set <OrderContents> orderContents;
	
	public Purchase()
	{
		orderContents = new HashSet<>();
		
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

	public Order getOrder() 
	{
		return order;
	}

	public void setOrder(Order order) 
	{
		this.order = order;
	}

	public Set<OrderContents> getOrderContents()
	{
		return orderContents;
	}

	public void setOrderContents(Set<OrderContents> orderContents) 
	{
		this.orderContents = orderContents;
	}
}