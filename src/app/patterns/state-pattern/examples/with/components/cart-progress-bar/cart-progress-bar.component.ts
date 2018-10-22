import { Component, OnInit, Input } from '@angular/core';
import { Item } from './item-model';
import { PubSubService } from '../../../../../../core/services/pub-sub/pub-sub.service';
import { InjectableCartService } from '../../../../../../dynamic/services';

@Component({
  selector: 'app-cart-progress-bar',
  templateUrl: './cart-progress-bar.component.html',
  styleUrls: ['./cart-progress-bar.component.css']
})
export class CartProgressBarComponent implements OnInit {
  items: Array<Item> = [];

  constructor(
    private pubSub: PubSubService,
    private injectableCartService: InjectableCartService
  ) {}

  ngOnInit() {
    this.getComponents();
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

  getComponents() {
    const components = this.injectableCartService.getComponents();
    components.forEach((item, index) => {
      this.items.push({ title: item.data.btnTitle, index: index });
    });
  }
}
