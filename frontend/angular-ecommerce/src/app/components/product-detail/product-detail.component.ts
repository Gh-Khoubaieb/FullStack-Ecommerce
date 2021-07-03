import { Component, OnInit } from '@angular/core';
import {Product} from "../../common/product";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product = new  Product();
  constructor(private productService: ProductService,
              private route: ActivatedRoute
            ) { }



  ngOnInit(): void {
    this.route.paramMap.subscribe( data => {
      this.handleProductDetails();
    });
  }
  handleProductDetails() {
    // get the id param string and converted to number
    const theProductId = +this.route.snapshot.paramMap.get('id') ;
    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    ) ;
  }
}
