import { ShoppingCart } from '../components/cart/cart-item';

export class CurrentState {
  index: number;
  btnText: string;
  validForm: boolean;
}

/**
 * This is the public interface for the State object.
 */
export interface State {
  /** Proceed to the next state in the work flow. */
  next(cart: ShoppingCart);

  /** Go back to a previous state in the work flow. */
  back();

  /** Get the current state of the State machine. */
  getCurrentState();
}

/**
 * This is the concrete class that composes the State interface and it's methods
 * to be used by the host program.
 */
export class CartContext {
  private state: State;

  constructor() {
    /** Initialize the state */
    this.state = new Products(this);
  }

  /** Set the state of the context. */
  setState(state: State) {
    this.state = state;
  }

  /** Proceed to the next state in the work flow. */
  next(cart: ShoppingCart) {
    this.state.next(cart);
  }

  /** Go back to the previous state in the work flow. */
  back() {
    this.state.back();
  }

  /** Get the current state. */
  getCurrentState() {
    return this.state.getCurrentState();
  }
}

export class Products implements State {
  currentState: CurrentState;

  constructor(private context: CartContext) {
    this.currentState = new CurrentState();
    this.currentState.index = 0;
    this.currentState.btnText = 'View Cart';
    this.currentState.validForm = true;
   }

  getCurrentState() {
    return this.currentState;
  }
  next(cart: ShoppingCart) {
    if (cart.items.length === 0) {
      throw new Error('Please add one or more products to the cart.');
    }
    this.context.setState(new Cart(this.context));
  }
  back() {
    this.context.setState(this);
  }
}


export class Cart implements State {
  currentState: CurrentState;

  constructor(private context: CartContext) {
    this.currentState = new CurrentState();
    this.currentState.index = 1;
    this.currentState.btnText = 'Checkout';
    this.currentState.validForm = true;
   }

  getCurrentState() {
    return this.currentState;
  }
  next() {
    this.context.setState(new Checkout(this.context));
  }
  back() {
    this.context.setState(new Products(this.context));
  }
}


export class Checkout implements State {
  currentState: CurrentState;

  constructor(private context: CartContext) {
    this.currentState = new CurrentState();
    this.currentState.index = 2;
    this.currentState.btnText = 'Pay';
    this.currentState.validForm = false;
   }

  getCurrentState() {
    return this.currentState;
  }
  next(cart: ShoppingCart) {
    if (!cart.customerFormIsValid) {
      this.currentState = new CurrentState();
      this.currentState.validForm = false;
      throw new Error('Some Customer fields are missing.');
    }
    this.context.setState(new Pay(this.context));
  }
  back() {
    this.context.setState(new Cart(this.context));
  }
}

export class Pay implements State {
  currentState: CurrentState;

  constructor(private context: CartContext) {
    this.currentState = new CurrentState();
    this.currentState.index = 3;
    this.currentState.btnText = 'Confirm Order';
   }

  getCurrentState() {
    return this.currentState;
  }
  next() {
    this.context.setState(new Confirm(this.context));
  }
  back() {
    this.context.setState(new Checkout(this.context));
  }
}

export class Confirm implements State {
  currentState: CurrentState;

  constructor(private context: CartContext) {
    this.currentState = new CurrentState();
    this.currentState.index = 4;
    this.currentState.btnText = 'Submit Order';
  }

  getCurrentState() {
    return this.currentState;
  }
  next() {
    this.context.setState(new Done(this.context));
  }
  back() {
    this.context.setState(new Pay(this.context));
  }
}

export class Done implements State {
  currentState: CurrentState;

  constructor(private context: CartContext) {
    this.currentState = new CurrentState();
    this.currentState.index = 5;
    this.currentState.btnText = null;
  }

  getCurrentState() {
    return this.currentState;
  }
  next() {
    this.context.setState(new Products(this.context));
  }
  back() {
    this.context.setState(new Confirm(this.context));
  }
}
