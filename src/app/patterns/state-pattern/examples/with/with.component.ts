import { Component, OnInit } from '@angular/core';
import { CartContext } from './pattern/state';
import { PubSubService } from '../../../../core/services/pub-sub/pub-sub.service';
import { CartState } from '../../../../core/services/pub-sub/states/cart-state';
import { DynamicComponent } from '../../../../dynamic/dynamic-component';
import { InjectableCartService } from '../../../../dynamic/services';

@Component({
  selector: 'app-with',
  templateUrl: './with.component.html',
  styleUrls: ['./with.component.css']
})
export class WithComponent implements OnInit {
  cartContext: CartContext;
  cartState: number;
  components: DynamicComponent[];
  component: DynamicComponent;
  selectedIndex: number;

  constructor(private pubSub: PubSubService,
    private injectableCartService: InjectableCartService) {
    this.cartContext = new CartContext();
  }

  ngOnInit() {
    this.cartState = this.cartContext.getCurrentState();
    // this.selectedIndex = this.cartState + 1;
  }

  next() {
    this.cartContext.next();

    const cartState = new CartState();
    cartState.index = this.cartContext.getCurrentState();
    this.selectedIndex = cartState.index + 1;
    this.pubSub.publishCart(cartState);
  }

  back() {
    this.cartContext.back();

    const cartState = new CartState();
    cartState.index = this.cartContext.getCurrentState();
    this.selectedIndex = cartState.index + 1;
    this.pubSub.publishCart(cartState);
  }

  getComponents(index: number) {
    this.injectableCartService.cartIndex = index;
    this.components = this.injectableCartService.getComponents();
  }
}
