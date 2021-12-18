import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../models/product';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {

  productsList: Product[] = [];
  product: Product | undefined = {
    id: 0,
    name: '',
    price: 0,
    url: '',
    description: '',
    quantity: 1
  };
  qOfProducts: number[] = [];
  routeId: string = '';
  productIdFromRoute: number = 0;
  selectedQuantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService
  ) {
    this.routeId = this.route.snapshot.params['id'];
    this.productIdFromRoute = Number(this.routeId);

    this.qOfProducts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  ngOnInit(): void {

    this.productService.getProducts().subscribe(res => {
      this.productsList = res;
      this.product = this.productsList.find(({ id }) => id === this.productIdFromRoute);
    });

  }

  onSelect(selectedQuantity: number) {
    this.selectedQuantity = selectedQuantity;
  }
  addToCart(product: Product) {
    product.quantity = this.selectedQuantity;
    this.cartService.addToCart(product);
  }
}


