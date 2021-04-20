import { ProductService } from 'src/app/services/product.service';
import { ProductCategory } from './../../common/product-category';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-product-category',
    templateUrl: './product-category.component.html',
    styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

    productCategories: ProductCategory[];
    constructor(private productService: ProductService) { }

    ngOnInit(): void {
        this.listProductCategories();
    }

    listProductCategories(){
        this.productService.getProductCategories().subscribe(
            data => {
                this.productCategories = data;
            }
        )
    }

}
