
/**
 * This is the public interface for the State object.
 */
export interface State {
  /** Store the current index of the state for use in various scenarios. */
  currentStateIndex: number;

  /** Proceed to the next state in the work flow. */
  next();

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
  currentStateIndex: number;

  constructor() {
    /** Initialize the state */
    this.state = new Products(this);
  }

  /** Set the state of the context. */
  setState(state: State) {
    this.state = state;
  }

  /** Proceed to the next state in the work flow. */
  next() {
    this.state.next();
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
  currentStateIndex = 0;
  constructor(private context: CartContext) { }

  getCurrentState() {
    return this.currentStateIndex;
  }
  next() {
    this.context.setState(new Cart(this.context));
  }
  back() {
    this.context.setState(this);
  }
}


export class Cart implements State {
  currentStateIndex = 1;
  constructor(private context: CartContext) { }

  getCurrentState() {
    return this.currentStateIndex;
  }
  next() {
    this.context.setState(new Checkout(this.context));
  }
  back() {
    this.context.setState(new Products(this.context));
  }
}


export class Checkout implements State {
  currentStateIndex = 2;
  constructor(private context: CartContext) { }

  getCurrentState() {
    return this.currentStateIndex;
  }
  next() {
    this.context.setState(new Pay(this.context));
  }
  back() {
    this.context.setState(new Cart(this.context));
  }
}

export class Pay implements State {
  currentStateIndex = 3;
  constructor(private context: CartContext) { }

  getCurrentState() {
    return this.currentStateIndex;
  }
  next() {
    this.context.setState(new Confirm(this.context));
  }
  back() {
    this.context.setState(new Checkout(this.context));
  }
}

export class Confirm implements State {
  currentStateIndex = 4;
  constructor(private context: CartContext) {}

  getCurrentState() {
    return this.currentStateIndex;
  }
  next() {
    this.context.setState(new Done(this.context));
  }
  back() {
    this.context.setState(new Pay(this.context));
  }
}

export class Done implements State {
  currentStateIndex = 5;
  constructor(private context: CartContext) {}

  getCurrentState() {
    return this.currentStateIndex;
  }
  next() {
    this.context.setState(new Products(this.context));
  }
  back() {
    this.context.setState(new Confirm(this.context));
  }
}
