import { Component, OnInit, Input } from '@angular/core';
import { InjectableComponent } from '../../../../../../../dynamic/interfaces/injectable-component';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements InjectableComponent, OnInit {
  @Input() data: any;
  index: number;

  constructor() { }

  ngOnInit() {
    this.index = this.data.index;
  }


}
