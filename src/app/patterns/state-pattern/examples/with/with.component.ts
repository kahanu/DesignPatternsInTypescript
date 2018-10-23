import { Component, OnInit } from '@angular/core';
import { CartContext, CurrentState } from './pattern/state';
import { PubSubService } from '../../../../core/services/pub-sub/pub-sub.service';
import { CartProgressState } from '../../../../core/services/pub-sub/states/cart-state';
import { DynamicComponent } from '../../../../dynamic/dynamic-component';
import { InjectableCartService } from '../../../../dynamic/services';

@Component({
  selector: 'app-with',
  templateUrl: './with.component.html',
  styleUrls: ['./with.component.css']
})
export class WithComponent implements OnInit {
  cartContext: CartContext;
  components: DynamicComponent[];
  component: DynamicComponent;
  selectedIndex: number;
  currentState: CurrentState;

  constructor(
    private pubSub: PubSubService,
    private injectableCartService: InjectableCartService
  ) {
    this.cartContext = new CartContext();
  }

  ngOnInit() {
    this.currentState = this.cartContext.getCurrentState();

    /**
     * The selectedIndex represents the dynamic cart component to display.  We must add 1 to the
     * index number because the dynamic component class doesn't like a zero index.
     */
    this.selectedIndex = this.currentState.index + 1;
    this.getComponents(this.selectedIndex);
  }

  next() {
    this.cartContext.next();

    this.currentState = this.cartContext.getCurrentState();

    const cartProgressState = new CartProgressState();
    cartProgressState.index = this.currentState.index;

    this.selectedIndex = cartProgressState.index + 1;

    /** Publish the cart state to the progress bar. */
    this.pubSub.publishCartProgress(cartProgressState);
  }

  back() {
    this.cartContext.back();

    this.currentState = this.cartContext.getCurrentState();

    const cartProgressState = new CartProgressState();
    cartProgressState.index = this.currentState.index;

    this.selectedIndex = cartProgressState.index + 1;

    /** Publish the cart state to the progress bar. */
    this.pubSub.publishCartProgress(cartProgressState);
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
