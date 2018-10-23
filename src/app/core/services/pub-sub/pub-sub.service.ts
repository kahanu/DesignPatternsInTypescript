import { Injectable } from '@angular/core';
import { CartProgressState } from './states/cart-state';
import { Observable, BehaviorSubject } from 'rxjs/';
import { CartItem, ShoppingCart } from '../../../patterns/state-pattern/examples/with/components/cart/cart-item';

@Injectable()
export class PubSubService {

  private cartProgressPublisher = new BehaviorSubject<CartProgressState>(new CartProgressState());
  private viewCartPublisher = new BehaviorSubject<ShoppingCart>(new ShoppingCart());

  constructor() { }

  publishCartProgress(state: CartProgressState) {
    this.cartProgressPublisher.next(state);
  }

  getCartProgress(): Observable<CartProgressState> {
    return this.cartProgressPublisher.asObservable();
  }


  publishViewCart(state: ShoppingCart) {
    this.viewCartPublisher.next(state);
  }

  getViewCart(): Observable<ShoppingCart> {
    return this.viewCartPublisher.asObservable();
  }

}
