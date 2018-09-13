import { Component, OnInit } from '@angular/core';
import { TemperatureConversionStrategy } from './pattern/strategy';

@Component({
  selector: 'app-with',
  templateUrl: './with.component.html',
  styleUrls: ['./with.component.css']
})
export class WithComponent implements OnInit {
  strategy: TemperatureConversionStrategy;

  constructor() { }

  ngOnInit() {
  }

}
