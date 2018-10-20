
export interface State {
  next(context: CartContext);
  back(context: CartContext);
}

export class CartContext {
  private state: State;

  constructor() {
    this.state = new Empty();
  }

  setState(state: State) {
    this.state = state;
  }

  next() {
    this.state.next(this);
  }

  back() {
    this.state.back(this);
  }
}

export class Empty implements State {
  next(context: CartContext) {
    context.setState(new AddProduct());
  }
  back(context: CartContext) {
    context.setState(this);
  }
}

export class AddProduct implements State {
  next(context: CartContext) {
    context.setState(new Checkout());
  }
  back(context: CartContext) {
    context.setState(new Empty());
  }
}

export class Checkout implements State {
  next(context: CartContext) {
    context.setState(new Pay());
  }
  back(context: CartContext) {
    context.setState(new AddProduct());
  }
}

export class Pay implements State {
  next(context: CartContext) {
    context.setState(new Confirm());
  }
  back(context: CartContext) {
    context.setState(new Checkout());
  }
}

export class Confirm implements State {
  next(context: CartContext) {
    context.setState(new Done());
  }
  back(context: CartContext) {
    context.setState(new Pay());
  }
}

export class Done implements State {
  next(context: CartContext) {
    context.setState(new Empty());
  }
  back(context: CartContext) {
    context.setState(new Confirm());
  }
}
