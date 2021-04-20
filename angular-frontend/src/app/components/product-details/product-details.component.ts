import { CartService } from './../../services/cart.service';
import { Product } from './../../common/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

    //check for race condition
    product: Product = new Product();
    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private cartService: CartService) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(() => {
            this.handleProductDetails();
        });
    }

    handleProductDetails():void{
        const theProductId: number = +this.route.snapshot.paramMap.get('id');
        this.productService.getProduct(theProductId).subscribe(
            data => {
                this.product = data;
            }
        )
    }

    addToCart(product: Product){
        const theCartItem = new CartItem(product);

        this.cartService.addToCart(theCartItem);
    }
}
