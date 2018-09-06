import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MediatorService } from '../../../../core/services/patterns/mediator/mediator.service';

@Component({
  selector: 'app-without',
  templateUrl: './without.component.html',
  styleUrls: ['./without.component.css']
})
export class WithoutComponent implements OnInit {

  faPlus = faPlus;

  constructor(private mediatorService: MediatorService) { }

  ngOnInit() {
  }

}
