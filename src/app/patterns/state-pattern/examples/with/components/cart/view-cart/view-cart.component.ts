import { Component, OnInit } from '@angular/core';
import { CartItem, ShoppingCart } from '../cart-item';
import { PubSubService } from '../../../../../../../core/services/pub-sub/pub-sub.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {
  // cartItems: CartItem[] = [];
  // subTotal: number;
  // tax: number;
  // total: number;
  shoppingCart: ShoppingCart;

  constructor(private pubSub: PubSubService) { }

  ngOnInit() {
    this.pubSub.getViewCart()
      .subscribe(cart => {
        this.shoppingCart = cart;
      });
  }

}
