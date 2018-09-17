
export enum ConvertToTypes { TOFAHRENHEIT, TOCELSIUS, TOKELVIN }
export enum ConvertFromTypes { FAHRENHEIT, CELSIUS, KELVIN }

export class TemperatureContext {
  convertTo: ConvertToTypes;
  convertFrom: ConvertFromTypes;
}

interface Temperature {
  calculate(temperature: number): string;
}

class ToFahrenheitTemperature implements Temperature {
  context: TemperatureContext;
  constructor(context: TemperatureContext) {
    this.context = context;
  }
  calculate(temperature: number): string {
    if (this.validate()) {
      const result = Math.round((temperature * 1.8) + 32);
      return result.toString() + ' &#8457;';
    }
  }

  validate() {
    if (+this.context.convertFrom === +this.context.convertTo) {
      console.log('not valid');
      return false;
    } else {
      console.log('valid');
      return true;
    }
  }
}

class ToCelsiusTemperature implements Temperature {
  constructor(context: TemperatureContext) {

  }
  calculate(temperature: number): string {
    const result = Math.round((temperature - 32) * .55555555);
    return result.toString() + ' &#8451;';
  }
}

class ToKelvinTemperature implements Temperature {
  calculate(temperature: number): string {
    const result = Math.round((temperature - 32));
    return result.toString() + '';
  }
}

export class TemperatureConversionStrategy {
  list: Map<ConvertToTypes, Temperature> = new Map<ConvertToTypes, Temperature>();

  constructor(private context: TemperatureContext) {
    this.defineInstances();
  }

  calculate(temperature: number): string {
    return this.list.get(this.context.convertTo).calculate(temperature);
  }

  private defineInstances() {
    this.list.set(ConvertToTypes.TOCELSIUS, new ToCelsiusTemperature(this.context));
    this.list.set(ConvertToTypes.TOFAHRENHEIT, new ToFahrenheitTemperature(this.context));
  }
}

