import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TemperatureConversionStrategy, TemperatureContext, ConvertFromTypes, ConvertToTypes } from './pattern/strategy';

@Component({
  selector: 'app-with',
  templateUrl: './with.component.html',
  styleUrls: ['./with.component.css']
})
export class WithComponent implements OnInit {
  temperatureForm: FormGroup;
  strategy: TemperatureConversionStrategy;
  convertedResult: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.temperatureForm = this.fb.group({
      temperature: 0,
      convertFrom: ConvertFromTypes.FAHRENHEIT,
      convertTo: ConvertToTypes.TOCELSIUS
    });
  }

  convert() {
    const result = this.temperatureForm.value;
    const context = new TemperatureContext();
    context.convertTo = +result.convertTo;
    context.convertFrom = +result.convertFrom;

    this.strategy = new TemperatureConversionStrategy(context);
    this.convertedResult = this.strategy.calculate(result.temperature);
  }

}
