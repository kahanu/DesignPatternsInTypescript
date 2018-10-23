import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCart } from '../cart-item';
import { PubSubService } from '../../../../../../../core/services/pub-sub/pub-sub.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit, OnDestroy {
  shoppingCart: ShoppingCart;

  constructor(private pubSub: PubSubService) { }

  ngOnInit() {
    this.pubSub.getViewCart()
      .subscribe(cart => {
        this.shoppingCart = cart;
      });
  }

  ngOnDestroy() {}

}
