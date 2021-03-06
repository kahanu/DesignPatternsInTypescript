import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Item } from './item-model';
import { PubSubService } from '../../../../../../core/services/pub-sub/pub-sub.service';
import { InjectableCartService } from '../../../../../../dynamic/services';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-cart-progress-bar',
  templateUrl: './cart-progress-bar.component.html',
  styleUrls: ['./cart-progress-bar.component.css']
})
export class CartProgressBarComponent implements OnInit, OnDestroy {
  items: Array<Item> = [];

  constructor(
    private pubSub: PubSubService,
    private injectableCartService: InjectableCartService
  ) {}

  ngOnInit() {
    this.getComponents();
    this.setCartState();
  }

  ngOnDestroy() { }

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

  getComponents() {
    const components = this.injectableCartService.getComponents();
    components.forEach((item, index) => {
      this.items.push({ title: item.data.title, index: index });
    });
  }
}
