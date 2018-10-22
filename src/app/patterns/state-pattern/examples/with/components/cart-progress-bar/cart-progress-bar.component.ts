import { Component, OnInit, Input } from '@angular/core';
import { Item } from './item-model';
import { PubSubService } from '../../../../../../core/services/pub-sub/pub-sub.service';

@Component({
  selector: 'app-cart-progress-bar',
  templateUrl: './cart-progress-bar.component.html',
  styleUrls: ['./cart-progress-bar.component.css']
})
export class CartProgressBarComponent implements OnInit {
  // @Input() state: number;

  items: Array<Item> = [
    { title: 'Products', index: 0 },
    { title: 'Cart', index: 1 },
    { title: 'Checkout', index: 2 },
    { title: 'Pay', index: 3 },
    { title: 'Confirm', index: 4 },
    { title: 'Done', index: 5 }
  ];

  constructor(private pubSub: PubSubService) {}

  ngOnInit() {
    this.setCartState();
  }

  setCartState() {
    this.pubSub.getCart().subscribe(res => {

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
