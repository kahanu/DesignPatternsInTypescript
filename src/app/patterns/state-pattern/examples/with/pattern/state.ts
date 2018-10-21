
export interface State {
  currentStateIndex: number;
  next();
  back();
  getCurrentState();
  getCurrentClass();
}

export class CartContext {
  private state: State;
  currentStateIndex: number;

  constructor() {
    this.state = new Empty(this);
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

  getCurrentClass() {
    return this.state.getCurrentClass();
  }
}

export class Empty implements State {
  currentStateIndex = 0;
  constructor(private context: CartContext) {

  }
  getCurrentClass() {
    return 'emptyOn';
  }
  getCurrentState() {
    return 'Empty';
  }
  next() {
    this.context.currentStateIndex = this.currentStateIndex;
    this.context.setState(new AddProduct(this.context));
  }
  back() {
    this.context.setState(this);
  }
}

export class AddProduct implements State {
  currentStateIndex = 1;
  constructor(private context: CartContext) {

  }
  getCurrentClass() {
    console.log('context index: ', this.context.currentStateIndex, 'local index: ', this.currentStateIndex);
    return (this.context.currentStateIndex >= this.currentStateIndex) ? 'productsOn' : '';
  }
  getCurrentState() {
    return 'Products';
  }
  next() {
    this.context.currentStateIndex = this.currentStateIndex + 1;
    this.context.setState(new Checkout(this.context));
  }
  back() {
    this.context.setState(new Empty(this.context));
  }
}

export class Checkout implements State {
  currentStateIndex = 2;
  constructor(private context: CartContext) {

  }
  getCurrentClass() {
    console.log('context index: ', this.context.currentStateIndex, 'local index: ', this.currentStateIndex);
    return (this.context.currentStateIndex >= this.currentStateIndex) ? 'checkoutOn' : '';
  }
  getCurrentState() {
    return 'Checkout';
  }
  next() {
    this.context.currentStateIndex = this.currentStateIndex + 1;
    this.context.setState(new Pay(this.context));
  }
  back() {
    this.context.setState(new AddProduct(this.context));
  }
}

export class Pay implements State {
  currentStateIndex = 3;
  constructor(private context: CartContext) {

  }
  getCurrentClass() {
    console.log('context index: ', this.context.currentStateIndex, 'local index: ', this.currentStateIndex);
    return (this.context.currentStateIndex >= this.currentStateIndex) ? 'payOn' : '';
  }
  getCurrentState() {
    return 'Pay';
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
  constructor(private context: CartContext) {

  }
  getCurrentClass() {
    console.log('context index: ', this.context.currentStateIndex, 'local index: ', this.currentStateIndex);
    return (this.context.currentStateIndex >= this.currentStateIndex) ? 'confirmOn' : '';
  }
  getCurrentState() {
    return 'Confirm Order';
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
  constructor(private context: CartContext) {

  }
  getCurrentClass() {
    console.log('context index: ', this.context.currentStateIndex, 'local index: ', this.currentStateIndex);
    return (this.context.currentStateIndex >= this.currentStateIndex) ? 'doneOn' : '';
  }
  getCurrentState() {
    return 'Done';
  }
  next() {
    this.context.currentStateIndex = this.currentStateIndex + 1;
    this.context.setState(new Empty(this.context));
  }
  back() {
    this.context.setState(new Confirm(this.context));
  }
}
