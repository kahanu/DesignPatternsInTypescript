import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-without',
  templateUrl: './without.component.html',
  styleUrls: ['./without.component.css']
})
export class WithoutComponent implements OnInit {

  faPlus = faPlus;

  constructor() { }

  ngOnInit() {
  }

}
