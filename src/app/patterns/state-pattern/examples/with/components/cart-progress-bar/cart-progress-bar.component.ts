import { Component, OnInit } from '@angular/core';
import { Item } from './item-model';

@Component({
  selector: 'app-cart-progress-bar',
  templateUrl: './cart-progress-bar.component.html',
  styleUrls: ['./cart-progress-bar.component.css']
})
export class CartProgressBarComponent implements OnInit {

  items: Array<Item> = [
    { title: 'Products', index: 0, css: 'completed' },
    { title: 'Cart', index: 1, css: 'completed' },
    { title: 'Checkout', index: 2 },
    { title: 'Pay', index: 3 },
    { title: 'Confirm', index: 4 },
    { title: 'Done', index: 5 }
  ];

  constructor() { }

  ngOnInit() {
  }

}
