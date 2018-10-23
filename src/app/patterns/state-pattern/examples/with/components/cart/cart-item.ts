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

  addItem(item: CartItem) {
    this.items.push(item);
    this.items.forEach(cartItem => {
      this.subTotal += cartItem.price;
    });

    this.tax = +(this.subTotal * 0.0875).toFixed(2);
    this.total = +(this.subTotal + this.tax).toFixed(2);
  }
}
