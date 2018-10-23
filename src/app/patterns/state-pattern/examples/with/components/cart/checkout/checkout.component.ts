import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { InjectableComponent } from '../../../../../../../dynamic/interfaces/injectable-component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PubSubService } from '../../../../../../../core/services/pub-sub/pub-sub.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements InjectableComponent, OnInit {
  @Input()
  data: any;
  index: number;
  form: FormGroup;
  isValid: boolean;

  constructor(private fb: FormBuilder, private pubSub: PubSubService) {}

  ngOnInit() {
    this.index = this.data.index;
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      firstName: ['John', Validators.required],
      lastName: ['Smith', Validators.required],
      address: ['1234 Main St.'],
      city: ['Any Town'],
      state: ['CA'],
      zip: ['90029']
    });
  }

}
