import { Component, OnInit, Input } from '@angular/core';
import { InjectableComponent } from '../../../../../../../dynamic/interfaces/injectable-component';
import { CartItem, ShoppingCart } from '../cart-item';
import { PubSubService } from '../../../../../../../core/services/pub-sub/pub-sub.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements InjectableComponent, OnInit {
  @Input()
  data: any;
  index: number;
  products: Array<CartItem>;
  shoppingCart: ShoppingCart = new ShoppingCart();

  constructor(private pubSub: PubSubService) {}

  ngOnInit() {
    this.index = this.data.index;
    this.loadProducts();
  }

  loadProducts() {
    this.products = [
      { id: 1, name: 'Widget 1', price: 10.99 },
      { id: 2, name: 'Widget 2', price: 2.99 },
      { id: 3, name: 'Widget 3', price: 103.99 }
    ];
  }

  addToCart(cartItem: CartItem) {

    this.shoppingCart.addItem(cartItem);

    this.pubSub.publishViewCart(this.shoppingCart);
  }
}
