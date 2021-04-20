import { CartItem } from './../../common/cart-item';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-cart-status',
    templateUrl: './cart-status.component.html',
    styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

    totalPrice: number = 0.00;
    totalQuantity: number = 0;
    cartItems : CartItem[] = [];
    storage: Storage = localStorage;

    constructor(private cartService: CartService) {
        //fix bug for first load page
        if ( this.storage.getItem('cartItems') != null){
            this.cartItems = JSON.parse(this.storage.getItem('cartItems'));

            let totalPriceValue: number = 0;
            let totalQuantityValue: number = 0;

            for(let currentCartItem of this.cartItems){
                totalPriceValue += currentCartItem.unitPrice * currentCartItem.quantity;
                totalQuantityValue += currentCartItem.quantity;
            }
            this.totalPrice = totalPriceValue;
            this.totalQuantity = totalQuantityValue;
        }
    }

    ngOnInit(): void {
        this.updateCartStatus();
    }

    updateCartStatus(){
        this.cartService.totalPrice.subscribe(
            data => this.totalPrice = data
        )
        this.cartService.totalQuantity.subscribe(
            data => this.totalQuantity = data
        )
        console.log(this.totalPrice, this.totalQuantity);
    }
}
