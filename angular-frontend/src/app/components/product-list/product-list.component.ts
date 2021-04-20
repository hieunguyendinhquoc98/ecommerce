import { CartService } from './../../services/cart.service';
import { CartItem } from './../../common/cart-item';
import { Product } from './../../common/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    products: Product[];
    currentCategoryId: number = 1;
    previousCategoryId: number = 1;
    searchMode: boolean = false;

    thePageNumber: number = 1;
    thePageSize: number = 10;
    theTotalElements: number = 0;

    previousKeyword: string = null;
    constructor(private productService: ProductService,
                private route: ActivatedRoute,
                private cartService: CartService) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(() => {
            this.listProducts();
        });
    }

    listProducts() {
        this.searchMode = this.route.snapshot.paramMap.has('keyword');

        if(this.searchMode){
            this.handleSearchProducts();
        } else{
            this.handleListProducts();
        }
    }

    handleListProducts(){
        const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

        if(hasCategoryId) {
            // + for change from string to number
            this.currentCategoryId = + this.route.snapshot.paramMap.get('id');
        } else{
            this.currentCategoryId = 1;
        }


        if( this.previousCategoryId != this.currentCategoryId ){
            this.thePageNumber = 1;
        }

        this.previousCategoryId = this.currentCategoryId;

        this.productService.getProductListPaginate(
            this.thePageNumber -1,
            this.thePageSize,
            this.currentCategoryId)
            .subscribe(this.processResult()
        );
                // this.productService.getProductList(this.currentCategoryId).subscribe(
        //     data => {
        //         this.products = data;
        //     }
        // )
    }

    handleSearchProducts(){
        const theKeyword = this.route.snapshot.paramMap.get('keyword');

        if(this.previousKeyword != theKeyword){
            this.thePageNumber = 1;
        }

        this.previousKeyword = theKeyword;

        this.productService
            .searchProductPaginate(
                this.thePageNumber -1,
                this.thePageSize,
                theKeyword)
            .subscribe(this.processResult());
    }

    private processResult(){
        return data => {
            this.products = data._embedded.products;
            this.thePageNumber = data.page.number + 1;
            this.thePageSize = data.page.size;
            this.theTotalElements = data.page.totalElements;
        };
    }
    updatePageSize(pageSize: number) {
        this.thePageSize = pageSize;
        this.thePageNumber = 1;
        this.listProducts();
    }

    addToCart(product: Product){
        const theCartItem = new CartItem(product);

        this.cartService.addToCart(theCartItem);
    }
}
