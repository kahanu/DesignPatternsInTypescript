import { Injectable } from '@angular/core';
import { InjectableService } from '../interfaces/injectable-service';
import { DynamicComponent } from '../dynamic-component';
import {
  CartComponent,
  ProductsComponent,
  CheckoutComponent,
  PayComponent,
  ConfirmComponent,
  DoneComponent
} from '../../patterns/state-pattern/examples/with/components/cart';

@Injectable()
export class InjectableCartService implements InjectableService {
  private _index: number;

  constructor() {}

  get cartIndex(): number {
    return this._index;
  }

  set cartIndex(index: number) {
    this._index = index;
  }

  getComponents(): DynamicComponent[] {
    return [
      new DynamicComponent(ProductsComponent, {
        title: 'Products',
        index: this._index
      }),
      new DynamicComponent(CartComponent, {
        title: 'Cart',
        index: this._index
      }),
      new DynamicComponent(CheckoutComponent, {
        title: 'Checkout',
        index: this._index
      }),
      new DynamicComponent(PayComponent, {
        title: 'Pay',
        index: this._index
      }),
      new DynamicComponent(ConfirmComponent, {
        title: 'Confirm Order',
        index: this._index
      }),
      new DynamicComponent(DoneComponent, {
        title: 'Thanks',
        index: this._index
      })
    ];
  }
}
