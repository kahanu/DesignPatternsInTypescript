import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-without',
  templateUrl: './without.component.html',
  styleUrls: ['./without.component.css']
})
export class WithoutComponent implements OnInit {
  temperatureForm: FormGroup;
  convertedResult: string;
  errorMessage: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.temperatureForm = this.fb.group({
      temperature: 68,
      convertFrom: 0,
      convertTo: 1
    });
  }

  convert() {
    const result = this.temperatureForm.value;
    this.errorMessage = null;
    const temperature = result.temperature;

    if (+result.convertFrom === +result.convertTo) {
      this.errorMessage = 'Cannot convert from the same type.';
    } else {
      this.errorMessage = null;
    }


    if (+result.convertFrom === 0 && +result.convertTo === 1) {
      // F to C
      const temp = Math.round((temperature - 32) * 0.55555555);
      this.convertedResult = temp.toString() + ' &#8451;';
    } else if (+result.convertFrom === 0 && +result.convertTo === 2) {
      // F to K
      const temp = Math.round((temperature - 32) * 0.55555555) + 273.15;
      this.convertedResult = temp.toString() + ' &#8490;';
    } else if (+result.convertFrom === 1 && +result.convertTo === 0) {
      // C to F
      const temp = Math.round(temperature * 1.8 + 32);
      this.convertedResult = temp.toString() + ' &#8457;';
    } else if (+result.convertFrom === 1 && +result.convertTo === 2) {
      // C to K
      const temp = temperature + 273.15;
      this.convertedResult = temp.toString() + ' &#8490;';
    } else if (+result.convertFrom === 2 && +result.convertTo === 0) {
      // K to F
      const temp = Math.round((temperature - 273.15) * 1.8 + 32);
      this.convertedResult = temp.toString() + ' &#8457;';
    } else if (+result.convertFrom === 2 && +result.convertTo === 1) {
      // K to C
      const temp = Math.round(temperature - 273.15);
      this.convertedResult = temp.toString() + ' &#8451;';
    }
  }
}
