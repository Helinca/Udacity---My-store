import { Component, OnInit } from '@angular/core';

import { Castomer } from '../models/castomer';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  castomer: Castomer = {
    name: '',
    address: '',
    creditCard: '',
    total: 0,
  }

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.castomer = this.cartService.getCastomer();
  }
}
