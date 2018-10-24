import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCart } from '../with/components/cart/cart-item';
import { PubSubService } from '../../../../core/services/pub-sub/pub-sub.service';

@Component({
  selector: 'app-floating-cart',
  templateUrl: './floating-cart.component.html',
  styleUrls: ['./floating-cart.component.css']
})
export class FloatingCartComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  itemCount: number;
  shoppingCart: ShoppingCart;

  constructor(private pubSub: PubSubService) { }

  ngOnInit() {
    this.itemCount = 2;
    this.pubSub.getViewCart()
      .subscribe(cart => {
        this.shoppingCart = cart;
      });
  }

}
