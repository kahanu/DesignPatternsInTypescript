import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartContext, CurrentState, Products } from './pattern/state';
import { PubSubService } from '../../../../core/services/pub-sub/pub-sub.service';
import { CartProgressState } from '../../../../core/services/pub-sub/states/cart-state';
import { DynamicComponent } from '../../../../dynamic/dynamic-component';
import { InjectableCartService } from '../../../../dynamic/services';
import { ShoppingCart } from './components/cart/cart-item';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ISubscription } from 'rxjs/Subscription';

@AutoUnsubscribe()
@Component({
  selector: 'app-with',
  templateUrl: './with.component.html',
  styleUrls: ['./with.component.css']
})
export class WithComponent implements OnInit, OnDestroy {
  cartContext: CartContext;
  components: DynamicComponent[];
  // component: DynamicComponent;
  selectedIndex: number;
  currentState: CurrentState;
  subscription: ISubscription;
  errorMessage: string;
  customerFormIsValid: boolean;
  disableNextButton = false;

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

  ngOnDestroy() {}

  next() {
    this.errorMessage = null;

    this.subscription = this.pubSub.getViewCart().subscribe(cart => {
      if (cart.items.length > 0) {
        this.cartContext.next();

        this.currentState = this.cartContext.getCurrentState();

        const cartProgressState = new CartProgressState();
        cartProgressState.index = this.currentState.index;

        this.selectedIndex = cartProgressState.index + 1;

        /** Publish the cart state to the progress bar. */
        this.pubSub.publishCartProgress(cartProgressState);
      }
      if (cart.items.length === 0 && this.currentState.index === 0) {
        this.errorMessage = 'Please add one or more products to the cart.';
      }
    });

    this.subscription.unsubscribe();
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

  continueShopping() {
    this.pubSub.publishViewCart(new ShoppingCart());
    this.cartContext = new CartContext();

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
