import { CartService } from './../../services/cart.service';
import { CartItem } from './../../common/cart-item';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-cart-details',
    templateUrl: './cart-details.component.html',
    styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

    cartItems: CartItem[] = [];
    totalPrice: number = 0;
    totalQuantity: number = 0;

    constructor(private cartService: CartService) { }

    ngOnInit(): void {
        this.listCartDetails();
    }
    listCartDetails() {
        this.cartService.totalPrice.subscribe(
            data => this.totalPrice = data
        )
        this.cartService.totalQuantity.subscribe(
            data => this.totalQuantity = data
        )
        this.cartItems = this.cartService.cartItems;
        // console.log(this.cartItems, this.totalPrice, this.totalQuantity);
        this.cartService.computeCartTotals();
        // console.log(this.cartItems, this.totalPrice, this.totalQuantity);
    }

    incrementQuantity(cartItem: CartItem){
        this.cartService.addToCart(cartItem)
    }
    decrementQuantity(cartItem: CartItem){
        this.cartService.removeFromCart(cartItem)
    }
    remove(cartItem: CartItem){
        this.cartService.remove(cartItem);
    }
}
