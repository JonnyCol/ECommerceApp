package com.useche.jonathan.ecommerce.dto;

// Sends back a Java Object as JSON
public class PurchaseResponse
{
	private String trackingNumber;
	
	public PurchaseResponse()
	{
		
	}
	
	public PurchaseResponse(String trackingNumber)
	{
		this.trackingNumber = trackingNumber;
	}
	
	
	
	public void setTrackingNumber(String trackingNumber)
	{
		this.trackingNumber = trackingNumber;
	}
	
	public String getTrackingNumber()
	{
		return trackingNumber;
	}
}
