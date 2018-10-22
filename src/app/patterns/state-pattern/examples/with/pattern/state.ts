
export interface State {
  currentStateIndex: number;
  next();
  back();
  getCurrentState();
}

export class CartContext {
  private state: State;
  currentStateIndex: number;

  constructor() {
    this.state = new Products(this);
  }

  setState(state: State) {
    this.state = state;
  }

  next() {
    this.state.next();
  }

  back() {
    this.state.back();
  }

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
    this.context.currentStateIndex = this.currentStateIndex + 1;
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
    this.context.currentStateIndex = this.currentStateIndex + 1;
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
    this.context.currentStateIndex = this.currentStateIndex + 1;
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
    this.context.currentStateIndex = this.currentStateIndex + 1;
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
    this.context.currentStateIndex = this.currentStateIndex + 1;
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
    this.context.currentStateIndex = this.currentStateIndex + 1;
    this.context.setState(new Products(this.context));
  }
  back() {
    this.context.setState(new Confirm(this.context));
  }
}
