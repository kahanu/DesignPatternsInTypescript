import { Component, OnInit, Input } from '@angular/core';
import { InjectableComponent } from '../../../../../../../dynamic/interfaces/injectable-component';
import { PubSubService } from '../../../../../../../core/services/pub-sub/pub-sub.service';
import { CartItem, ShoppingCart } from '../cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements InjectableComponent, OnInit {
  @Input() data: any;
  index: number;
  shoppingCart: ShoppingCart;
  // items: CartItem[] = [];

  constructor(private pubSub: PubSubService) { }

  ngOnInit() {
    this.index = this.data.index;
    this.pubSub.getViewCart()
      .subscribe(cart => {
        this.shoppingCart = cart;
      });
  }

}
