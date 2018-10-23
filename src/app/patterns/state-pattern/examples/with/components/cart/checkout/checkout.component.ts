import { Component, OnInit, Input } from '@angular/core';
import { InjectableComponent } from '../../../../../../../dynamic/interfaces/injectable-component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements InjectableComponent, OnInit {
  @Input() data: any;
  index: number;
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

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
