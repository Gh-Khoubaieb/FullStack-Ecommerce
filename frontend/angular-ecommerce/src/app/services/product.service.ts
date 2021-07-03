import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../common/product";
import {map} from "rxjs/operators";
import {ProductCategory} from "../common/product-category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 private  baseurl = 'http://localhost:8080/api/products';

 private  categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private  httpClient: HttpClient) { }

  getProductList(categoryId: number): Observable<Product[]> {
    // build URL based on category id ... will be back
    const searchUrl = `${this.baseurl}/search/findByCategoryId?id=${categoryId}` ;

    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {


    return this.httpClient.get<GetResponseProductsCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }


  searchProduct(keyword: string): Observable<Product[]>  {
    //build URL based on keyword
    const searchUrl = `${this.baseurl}/search/findByNameContaining?name=${keyword}` ;

    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string) {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProduct(id: number): Observable<Product> {
    const productUrl =  `${this.baseurl}/${id}` ;
    return this.httpClient.get<Product>(productUrl);
  }
}


interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductsCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
