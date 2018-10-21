import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('productsItem') productsItem: ElementRef;
  @ViewChild('cartItem') cartItem: ElementRef;
  @ViewChild('checkoutItem') checkoutItem: ElementRef;
  @ViewChild('payItem') payItem: ElementRef;
  @ViewChild('confirmItem') confirmItem: ElementRef;
  @ViewChild('doneItem') doneItem: ElementRef;


  constructor() {
    this.cartContext = new CartContext();
   }

  ngOnInit() {
    this.cartState = this.cartContext.getCurrentState();
    console.log('initial state: ', this.cartState);
  }

  next() {
    this.cartContext.next();
    this.cartState = this.cartContext.getCurrentState();
    this.currentItemClass = this.cartContext.getCurrentClass();
    console.log('cartState: ', this.cartState, ' - class: ', this.currentItemClass);

    if (this.cartState === 'Cart') {
      const cssItem = this.cartItem;
      cssItem.nativeElement.className += ' ' + this.currentItemClass;
    }

    if (this.cartState === 'Checkout') {
      const cssItem = this.checkoutItem;
      cssItem.nativeElement.className += ' ' + this.currentItemClass;
    }

    if (this.cartState === 'Pay') {
      const cssItem = this.payItem;
      cssItem.nativeElement.className += ' ' + this.currentItemClass;
    }

    if (this.cartState === 'Confirm') {
      const cssItem = this.confirmItem;
      cssItem.nativeElement.className += ' ' + this.currentItemClass;
    }

    if (this.cartState === 'Done') {
      const cssItem = this.doneItem;
      cssItem.nativeElement.className += ' ' + this.currentItemClass;
    }

  }

  back() {
    this.cartContext.back();
    this.cartState = this.cartContext.getCurrentState();
    console.log('cartState: ', this.cartState);
  }
}
