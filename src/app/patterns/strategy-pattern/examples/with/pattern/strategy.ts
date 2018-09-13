
export enum TemperatureTypes { TOFAHRENHEIT, TOCELSIUS }

export class TemperatureContext {
  current: number;
  convert: TemperatureTypes;
}

interface Temperature {
  calculate(current: number): string;
}

class CelsiusToFahrenheitTemperature implements Temperature {

  calculate(current: number): string {
    const result = current * 1.8 + 32;
    return result.toString() + ' &deg;F';
  }
}

class FahrenheitToCelsiusTemperature implements Temperature {
  calculate(current: number): string {
    const result = (current - 32) * 1.8;
    return result.toString() + ' &deg;C';
  }
}

export class TemperatureConversionStrategy {
  list: Map<TemperatureTypes, Temperature> = new Map<TemperatureTypes, Temperature>();

  constructor(private context: TemperatureContext) {
    this.defineInstances();
  }

  calculate(current: number): string {
    return this.list.get(this.context.convert).calculate(current);
  }

  private defineInstances() {
    this.list.set(TemperatureTypes.TOCELSIUS, new FahrenheitToCelsiusTemperature());
    this.list.set(TemperatureTypes.TOFAHRENHEIT, new CelsiusToFahrenheitTemperature());
  }
}

