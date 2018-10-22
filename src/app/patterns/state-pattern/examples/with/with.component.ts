import { Component, OnInit } from '@angular/core';
import { CartContext } from './pattern/state';
import { PubSubService } from '../../../../core/services/pub-sub/pub-sub.service';
import { CartState } from '../../../../core/services/pub-sub/states/cart-state';

@Component({
  selector: 'app-with',
  templateUrl: './with.component.html',
  styleUrls: ['./with.component.css']
})
export class WithComponent implements OnInit {
  cartContext: CartContext;
  cartState: number;

  constructor(private pubSub: PubSubService) {
    this.cartContext = new CartContext();
  }

  ngOnInit() {
    this.cartState = this.cartContext.getCurrentState();
  }

  next() {
    this.cartContext.next();

    const cartState = new CartState();
    cartState.index = this.cartContext.getCurrentState();
    this.pubSub.publishCart(cartState);
  }

  back() {
    this.cartContext.back();

    const cartState = new CartState();
    cartState.index = this.cartContext.getCurrentState();
    this.pubSub.publishCart(cartState);
  }
}
