import { Component, OnInit, Input } from '@angular/core';

import { CartService } from '../services/cart.service';
import { Product } from '../models/product';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem: Product;

  qOfProducts: number[] = [];
  selectedQuantity: number = 1;

  constructor(
    private cartService: CartService,
  ) { 
    this.productItem = {
      id: 0,
      name: '',
      price: 0,
      url: '',
      description: '',
      quantity: 1
    }
    this.qOfProducts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  ngOnInit(): void {
  }

  onSelect(selectedQuantity: number) {
    this.selectedQuantity = selectedQuantity;
  }

  addToCart(product: Product) {
    product.quantity = this.selectedQuantity;
    this.cartService.addToCart(product);
  }

}
