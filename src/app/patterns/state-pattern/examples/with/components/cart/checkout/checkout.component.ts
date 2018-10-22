import { Component, OnInit, Input } from '@angular/core';
import { InjectableComponent } from '../../../../../../../dynamic/interfaces/injectable-component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements InjectableComponent, OnInit {
  @Input() data: any;
  index: number;

  constructor() { }

  ngOnInit() {
    this.index = this.data.index;
  }


}
