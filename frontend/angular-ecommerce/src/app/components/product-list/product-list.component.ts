import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] ;
  currentCategoryId: number ;
  searchMode: boolean;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( () => {
      this.listProducts() ;
      }
    );

  }

  listProducts() {
    this.searchMode = this.activatedRoute.snapshot.paramMap.has('keyword');
    //console.log('search mode=', this.searchMode);

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

    handleSearchProducts() {
      const theKeyWord: string = this.activatedRoute.snapshot.paramMap.get('keyword');

      //search for product by keyword

      this.productService.searchProduct(theKeyWord).subscribe( data => {
        console.log('data search=',data);
        this.products = data;
      });
    }

    handleListProducts() {
      //check if 'id' parameter is available

      const hasCategoryId: boolean = this.activatedRoute.snapshot.paramMap.has('id') ;

      if(hasCategoryId) {
        //get  the 'id' param string, convert the string to number with + symbol

        this.currentCategoryId = +this.activatedRoute.snapshot.paramMap.get('id');
      } else {
        // not category id available.. deafault category id = 1
        this.currentCategoryId = 1 ;
      }

      //get product for the given category id
      this.productService.getProductList(this.currentCategoryId).subscribe(
        data => {
          this.products = data;
        }
      );
    }
}
