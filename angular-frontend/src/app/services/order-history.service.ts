import { OrderHistory } from './../common/order-history';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class OrderHistoryService {

    private orderUrl = 'http://localhost:8080/api/v1/orders';
    constructor(private httpClient: HttpClient) {};
    getOrderHistory(theEmail: string): Observable<GetResponseOrderHistory> {
        const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmail?email=${theEmail}`;

        return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl);
    }
}

interface GetResponseOrderHistory {
    _embedded: {
        orders: OrderHistory[]
    }
}
