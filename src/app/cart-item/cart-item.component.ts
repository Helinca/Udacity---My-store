import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Product } from '../models/product';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: Product;
  @Output() newTotal = new EventEmitter;

  amount: number = 0;
  itemTotal: number;

  constructor() {
    this.cartItem = {
      id: 0,
      name: '',
      price: 0,
      url: '',
      description: '',
      quantity: 1
    }
    this.itemTotal = this.cartItem.quantity * this.cartItem.price;
  }

  onSelect(selectedQuantity: number) {
    this.cartItem.quantity = selectedQuantity;
    this.itemTotal = this.cartItem.quantity * this.cartItem.price;
    this.newTotal.emit(this.cartItem);
  }

  deleteFromCart(product: Product) {
   product.quantity = 0; 
   this.itemTotal = product.quantity * product.price;
    this.newTotal.emit(product);
  }

  ngOnInit(): void {
    this.itemTotal = this.cartItem.quantity * this.cartItem.price;
  }
}
