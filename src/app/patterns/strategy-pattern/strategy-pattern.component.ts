import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-strategy-pattern',
  templateUrl: './strategy-pattern.component.html',
  styleUrls: ['./strategy-pattern.component.css']
})
export class StrategyPatternComponent implements OnInit {
  message: string;

  constructor() { }

  ngOnInit() {
    this.init();
  }

  init() {
    const x: Map<string, string> = new Map<string, string>();
    x.set('golf', 'Going Golfing');
    x.set('hike', 'Going hiking');
    this.message = x.get('hike');
  }

}
