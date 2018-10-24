import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../../../with/components/cart-progress-bar/item-model';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { PubSubService } from '../../../../../../core/services/pub-sub/pub-sub.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-cart-progress-bar',
  templateUrl: './cart-progress-bar.component.html',
  styleUrls: ['./cart-progress-bar.component.css']
})
export class CartProgressBarComponent implements OnInit, OnDestroy {
  items: Array<Item> = [
    { title: 'Products', index: 0 },
    { title: 'Cart', index: 1 },
    { title: 'Checkout', index: 2 },
    { title: 'Pay', index: 3 },
    { title: 'Confirm', index: 4 },
    { title: 'Done', index: 5 }
  ];

  constructor(private pubSub: PubSubService) { }

  ngOnInit() {
    this.setCartState();
  }

  ngOnDestroy() {}

  setCartState() {
    this.pubSub.getCartProgress().subscribe(res => {
      this.items.forEach(item => {
        if (item.index <= res.index) {
          item.css = 'completed';
        } else if (item.index > res.index) {
          item.css = '';
        }
      });
    });
  }
}
