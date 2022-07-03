import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderHistory } from '../common/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  //private orderUrl = "http://localhost:7799/api/orders";
  private orderUrl = environment.jonnycolShopApiUrl + "orders";

  constructor(private httpClient: HttpClient) { }

  getOrderHistory(email: string): Observable<GetOrderHistoryResponse>{
    const orderHistoryUrl = this.orderUrl + "/search/findByCustomerEmailOrderByDateCreatedDesc?email=" + email;
    return this.httpClient.get<GetOrderHistoryResponse>(orderHistoryUrl);
  }
}


interface GetOrderHistoryResponse{
  _embedded:{
    orders: OrderHistory[];
  }  
}