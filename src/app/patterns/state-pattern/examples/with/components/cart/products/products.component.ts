import { Component, OnInit, Input } from '@angular/core';
import { InjectableComponent } from '../../../../../../../dynamic/interfaces/injectable-component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements InjectableComponent, OnInit {
  @Input() data: any;
  index: number;

  constructor() { }

  ngOnInit() {
    this.index = this.data.index;
  }

}
