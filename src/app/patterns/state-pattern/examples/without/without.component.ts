import { Component, OnInit } from '@angular/core';
import { DynamicComponent } from '../../../../dynamic/dynamic-component';
import { CurrentState } from '../with/pattern/state';
import { PubSubService } from '../../../../core/services/pub-sub/pub-sub.service';
import { InjectableCartService } from '../../../../dynamic/services';
import { CartProgressState } from '../../../../core/services/pub-sub/states/cart-state';
import { ISubscription } from 'rxjs/Subscription';
import { ShoppingCart } from '../with/components/cart/cart-item';

@Component({
  selector: 'app-without',
  templateUrl: './without.component.html',
  styleUrls: ['./without.component.css']
})
export class WithoutComponent implements OnInit {
  components: DynamicComponent[];
  subscription: ISubscription;
  errorMessage: string;
  selectedIndex: number;
  currentStateIndex: number;
  showCommandButtons: boolean;
  btnText: string;

  constructor(
    private pubSub: PubSubService,
    private injectableCartService: InjectableCartService
  ) {}

  ngOnInit() {
    this.showCommandButtons = true;
    this.currentStateIndex = 0;
    this.btnText = 'View Cart';
    this.selectedIndex = 1;
    this.getComponents(this.selectedIndex);
  }

  next() {
    this.errorMessage = null;

    this.subscription = this.pubSub.getViewCart().subscribe(cart => {
      if (cart.items.length > 0) {
        switch (this.currentStateIndex) {
          case 0: // show cart
            this.currentStateIndex = 1;
            this.btnText = 'Checkout';
            break;
          case 1: // show checkout
            this.currentStateIndex = 2;
            this.btnText = 'Pay';
            break;
          case 2: // show pay
            this.currentStateIndex = 3;
            this.btnText = 'Confirm Order';
            break;
          case 3: // show confirm order
            this.currentStateIndex = 4;
            this.btnText = 'Place Order';
            break;
          case 4: // show place order
            this.currentStateIndex = 5;
            this.btnText = null;
            this.showCommandButtons = false;
            // this.pubSub.publishViewCart(new ShoppingCart());
            break;
          case 5: // show done
            this.currentStateIndex = 0;
            this.btnText = 'ViewCart';
            this.showCommandButtons = true;
            break;
          default:
            this.currentStateIndex = 0;
            this.btnText = 'View Cart';
            break;
        }

        const cartProgressState = new CartProgressState();
        cartProgressState.index = this.currentStateIndex;

        this.selectedIndex = cartProgressState.index + 1;

        /** Publish the cart state to the progress bar. */
        this.pubSub.publishCartProgress(cartProgressState);
      }

      if (cart.items.length === 0 && this.currentStateIndex === 0) {
        this.errorMessage = 'Please add one or more products to the cart.';
      }
    });
    this.subscription.unsubscribe();
  }

  back() {
    const index = this.currentStateIndex;
    switch (index) {
      // case 0: // show cart
      //   this.currentStateIndex = 1;
      //   this.btnText = 'Products';
      //   break;
      case 1: // show checkout
        this.currentStateIndex = 0;
        this.btnText = 'View Cart';
        break;
      case 2: // show pay
        this.currentStateIndex = 1;
        this.btnText = 'Checkout';
        break;
      case 3: // show confirm order
        this.currentStateIndex = 2;
        this.btnText = 'Pay';
        break;
      case 4: // show place order
        this.currentStateIndex = 3;
        this.btnText = 'Confirm';
        break;
      default:
        this.currentStateIndex = 0;
        this.btnText = 'View Cart';
        break;
    }

    const cartProgressState = new CartProgressState();
    cartProgressState.index = this.currentStateIndex;

    this.selectedIndex = cartProgressState.index + 1;

    /** Publish the cart state to the progress bar. */
    this.pubSub.publishCartProgress(cartProgressState);
  }

  continueShopping() {}

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
