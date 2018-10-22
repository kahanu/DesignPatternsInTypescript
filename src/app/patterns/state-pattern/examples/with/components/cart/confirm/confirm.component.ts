import { Component, OnInit, Input } from '@angular/core';
import { InjectableComponent } from '../../../../../../../dynamic/interfaces/injectable-component';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements InjectableComponent, OnInit {
  @Input() data: any;
  index: number;

  constructor() { }

  ngOnInit() {
    this.index = this.data.index;
  }


}
