import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { InjectableComponent } from '../../../../../../../dynamic/interfaces/injectable-component';
import { PubSubService } from '../../../../../../../core/services/pub-sub/pub-sub.service';
import { ShoppingCart } from '../cart-item';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements InjectableComponent, OnInit, OnDestroy {
  @Input() data: any;
  index: number;
  shoppingCart: ShoppingCart;

  constructor(private pubSub: PubSubService) { }

  ngOnInit() {
    this.index = this.data.index;
    this.pubSub.getViewCart()
      .subscribe(cart => {
        this.shoppingCart = cart;
      });
  }

  ngOnDestroy() { }

}
