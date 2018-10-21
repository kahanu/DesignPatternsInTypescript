import { Component, OnInit } from '@angular/core';
import { CartContext } from './pattern/state';

@Component({
  selector: 'app-with',
  templateUrl: './with.component.html',
  styleUrls: ['./with.component.css']
})
export class WithComponent implements OnInit {

  cartContext: CartContext;
  cartState: string;
  currentClass = 'bg-info';
  currentItemClass = '';
  emptyOnClass = 'emptyOn';


  constructor() {
    this.cartContext = new CartContext();
   }

  ngOnInit() {
    this.cartState = this.cartContext.getCurrentState();
  }

  next() {
    this.cartContext.next();
    this.cartState = this.cartContext.getCurrentState();
    this.currentItemClass = this.cartContext.getCurrentClass();
    console.log('cartState: ', this.cartState, 'class: ', this.currentItemClass);

  }

  back() {
    this.cartContext.back();
    this.cartState = this.cartContext.getCurrentState();
    console.log('cartState: ', this.cartState);
  }
}
