import { Injectable } from '@angular/core';
import { Castomer } from '../models/castomer';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: Product[] = [];
  castomer: Castomer = {
    name: '',
    address: '',
    creditCard: '',
    total: 0,
  }

  getCastomer() {
    return this.castomer;
  }
  addCastomer(castomer: Castomer) {
    this.castomer = castomer;
  }

  addToCart(product: Product) {
    const inTheCart = this.items.find(({ id }) => id === product.id);
    if (!inTheCart) {
      this.items.push(product);
    }
    else { inTheCart.quantity += product.quantity; }
    alert(`${product.name} has been added to cart!`);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  removeFromCart(product: Product) {
    this.items.forEach((value, index) => {
      if (value.id === product.id) { this.items.splice(index, 1); }
    })
    alert(`${product.name} have been deleted from Cart List!`);
  }

  constructor() { }
}
