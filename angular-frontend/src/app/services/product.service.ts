import { ProductCategory } from './../common/product-category';
import { Product } from './../common/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private baseUrl = 'http://localhost:8080/api/v1'
    constructor(private httpClient: HttpClient) { }

    getProductList(theCategoryId: number): Observable<Product[]> {

        const searchUrl = `${this.baseUrl}/products/search/findByCategoryId?id=${theCategoryId}`

        return this.getProducts(searchUrl);
    }

    getProductCategories(): Observable<ProductCategory[]> {
        const searchUrl = `${this.baseUrl}/product-category`
        return this.httpClient.get<GetResponseProductCategories>(searchUrl).pipe(
            map(response => response._embedded.productCategory)
        );
    }

    searchProducts(theKeyWord: string): Observable<Product[]> {
        console.log(theKeyWord);
        const searchUrl = `${this.baseUrl}/products/search/findByNameContaining?name=${theKeyWord}`;
        return this.getProducts(searchUrl);
    }

    searchProductPaginate(
        thePage: number,
        thePageSize: number,
        theKeyword: string): Observable<GetResponseProducts>{
            const url = `${this.baseUrl}/products/search/findByNameContaining`
            + `?name=${theKeyword}&page=${thePage}&size=${thePageSize}`;

            return this.httpClient.get<GetResponseProducts>(url);
        }

    getProduct(theProductId: number): Observable<Product> {
        const productUrl = `${this.baseUrl}/products/${theProductId}`;
        return this.httpClient.get<Product>(productUrl);
    }

    getProductListPaginate(
        thePage: number,
        thePageSize: number,
        theCategoryId: number): Observable<GetResponseProducts>{
            const url = `${this.baseUrl}/products/search/findByCategoryId`
            + `?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`;

            return this.httpClient.get<GetResponseProducts>(url);
        }

    private getProducts(searchUrl: string): Observable<Product[]> {
        return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
            map(response => response._embedded.products)
        );
    }


}

//upwrapped the json
interface GetResponseProducts {
    _embedded: {
        products: Product[];
    },
    page: {
        size: number;
        totalElements: number;
        totalPages: number;
        number: number;
    }
}
interface GetResponseProductCategories {
    _embedded: {
        productCategory: ProductCategory[];
    }
}
