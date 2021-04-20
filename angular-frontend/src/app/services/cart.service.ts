import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

    cartItems: CartItem[] = [];
    totalPrice: Subject<number> = new Subject<number>();
    totalQuantity: Subject<number> = new Subject<number>();

    //settings for reading data from session storage
    storage: Storage = localStorage;

    constructor() {
        let data = JSON.parse(this.storage.getItem('cartItems'));
        if (data != null) {
            this.cartItems = data;
        }

        this.computeCartTotals();
    }

    persistCartItems() {
        this.storage.setItem('cartItems', JSON.stringify(this.cartItems));

    }

    addToCart(theCartItem: CartItem){
        let alreadyExistsInCart: boolean = false;
        let existingCartItem: CartItem = undefined;

        if (this.cartItems.length > 0){
            // for( let tempCartItem of this.cartItems){
            //     if (tempCartItem.id === theCartItem.id) {
            //         existingCartItem = tempCartItem;
            //         break;
            //     }
            // }
            //Refactoring
            existingCartItem = this.cartItems.find( tempCartItem => tempCartItem.id === theCartItem.id);
        }


        alreadyExistsInCart = ( existingCartItem != undefined )

        if( alreadyExistsInCart) {
            existingCartItem.quantity++;
        } else{
            this.cartItems.push(theCartItem);
        }
        this.computeCartTotals();
    }
    removeFromCart(theCartItem: CartItem){
        theCartItem.quantity--;
        if (theCartItem.quantity === 0){
            this.remove(theCartItem)
        } else{
        this.computeCartTotals();
        }
    }
    remove(theCartItem: CartItem) {
        const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id = theCartItem.id);
        if( itemIndex > -1){
            this.cartItems.splice(itemIndex, 1);
            this.computeCartTotals();
        }
    }
    computeCartTotals() {
        let totalPriceValue: number = 0;
        let totalQuantityValue: number = 0;

        for(let currentCartItem of this.cartItems){
            totalPriceValue += currentCartItem.unitPrice * currentCartItem.quantity;
            totalQuantityValue += currentCartItem.quantity;
        }

        //next for publish for send event
        this.totalPrice.next(totalPriceValue);
        this.totalQuantity.next(totalQuantityValue);
        this.persistCartItems();
    }

}
