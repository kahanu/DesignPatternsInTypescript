import { Component, OnInit, Input } from '@angular/core';
import { InjectableComponent } from '../../../../../../../dynamic/interfaces/injectable-component';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements InjectableComponent, OnInit {
  @Input() data: any;
  index: number;

  constructor() { }

  ngOnInit() {
    this.index = this.data.index;
  }


}
