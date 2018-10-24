export class CartItem {
  id: number;
  name: string;
  price: number;
}

export class ShoppingCart {
  items: CartItem[] = [];
  subTotal = 0;
  tax = 0;
  total = 0;
  customerFormIsValid: boolean;
  paymentFormIsValid: boolean;

  addItem(item: CartItem) {
    this.items.push(item);
    let subTotal = 0;

    this.items.forEach(cartItem => {
      subTotal += cartItem.price;
    });

    this.subTotal = subTotal;

    this.tax = +(this.subTotal * 0.0875).toFixed(2);
    this.total = +(this.subTotal + this.tax).toFixed(2);
  }
}
