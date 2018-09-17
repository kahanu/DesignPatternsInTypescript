import { Injectable } from '@angular/core';
import { TemperatureConversionStrategy } from '../../../../patterns/strategy-pattern/examples/with/pattern/strategy';

@Injectable()
export class StrategyService {
  strategy: TemperatureConversionStrategy;

  constructor() { }

  setupTemperatureStrategy() {

  }

}
