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

    /**
     * The selectedIndex represents the dynamic cart component to display.  We must add 1 to the
     * index number because the dynamic component class doesn't like a zero index.
     */
    this.selectedIndex = this.cartState + 1;
    this.getComponents(this.selectedIndex);
  }

  next() {
    this.cartContext.next();

    const cartState = new CartState();
    cartState.index = this.cartContext.getCurrentState();

    this.selectedIndex = cartState.index + 1;

    /** Publish the cart state to the progress bar. */
    this.pubSub.publishCart(cartState);
  }

  back() {
    this.cartContext.back();

    const cartState = new CartState();
    cartState.index = this.cartContext.getCurrentState();

    this.selectedIndex = cartState.index + 1;

    /** Publish the cart state to the progress bar. */
    this.pubSub.publishCart(cartState);
  }

  /** Get the dynamic cart components. */
  getComponents(index: number) {
    /**
     * This index represents which cart component is selected via the Next or Back buttons,
     * and sets the index in the cart service which will return that component.
     */
    this.injectableCartService.cartIndex = index;

    /** Get all the dynamic cart components. */
    this.components = this.injectableCartService.getComponents();
  }
}
