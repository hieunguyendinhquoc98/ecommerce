import { OrderHistory } from './../../common/order-history';
import { OrderHistoryService } from './../../services/order-history.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-order-history',
    templateUrl: './order-history.component.html',
    styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {


    orderHistoryList: OrderHistory[] = [];
    storage: Storage = sessionStorage;
    constructor(private orderHistoryService: OrderHistoryService) { }

    ngOnInit(): void {

        this.handleOrderHistory();
    }
    handleOrderHistory() {
        const theEmail = JSON.parse(this.storage.getItem('userEmail'));

        this.orderHistoryService.getOrderHistory(theEmail).subscribe(
            data => this.orderHistoryList = data._embedded.orders //another way to get data! instead of pipe -> map
        )
    }

}
