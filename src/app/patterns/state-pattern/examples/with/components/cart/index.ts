import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PayComponent } from './pay/pay.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { DoneComponent } from './done/done.component';
import { ViewCartComponent } from './view-cart/view-cart.component';

export * from './products/products.component';
export * from './cart/cart.component';
export * from './checkout/checkout.component';
export * from './pay/pay.component';
export * from './confirm/confirm.component';
export * from './done/done.component';
export * from './view-cart/view-cart.component';

export const CARTCOMPONENTS = [
  ProductsComponent,
  CartComponent,
  CheckoutComponent,
  PayComponent,
  ConfirmComponent,
  DoneComponent,
  ViewCartComponent
];
