import { Injectable } from '@angular/core';
import { CartState } from './states/cart-state';
import { Observable, BehaviorSubject } from 'rxjs/';

@Injectable()
export class PubSubService {

  private cartPublisher = new BehaviorSubject<CartState>(new CartState());

  constructor() { }

  publishCart(state: CartState) {
    this.cartPublisher.next(state);
  }

  getCart(): Observable<CartState> {
    return this.cartPublisher.asObservable();
  }

}
