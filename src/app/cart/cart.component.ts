import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { CartService } from '../services/cart.service';
import { Castomer } from '../models/castomer';
import { Product } from '../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartList = this.cartService.getItems();

  total: number = 0;

  checkoutForm = this.formBuilder.group({
    name: '',
    address: '',
    creditCard: '',
  });

  castomer: Castomer = {
    name: '',
    address: '',
    creditCard: '',
    total: 0,
  }

  constructor(
    private cartService: CartService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  onSubmit(): void {
    this.castomer = {
      name: this.checkoutForm.value.name,
      address: this.checkoutForm.value.address,
      creditCard: this.checkoutForm.value.creditCard,
      total: this.total,
    }
    this.cartService.addCastomer(this.castomer);
    this.router.navigate(['/confirmation']);
    this.cartList = this.cartService.clearCart();
    this.checkoutForm.reset();
  }
  newTotal(itemFromCart: Product) {
    if (itemFromCart.quantity === 0) {
      //remove from cartList
      this.cartService.removeFromCart(itemFromCart);
    }
    this.total = 0;
    for (let item of this.cartList) {
      if (item.id === itemFromCart.id) {
        item.quantity = itemFromCart.quantity;
      }
      this.total = this.total + item.quantity * item.price;
    }
  }

  ngOnInit(): void {
    this.cartList = this.cartService.getItems();
    for (let item of this.cartList) {
      this.total = this.total + item.quantity * item.price;
    }
  }
}
