//#region Enums and interfaces
export enum ConvertToTypes {
  TOFAHRENHEIT,
  TOCELSIUS,
  TOKELVIN
}
export enum ConvertFromTypes {
  FAHRENHEIT,
  CELSIUS,
  KELVIN
}

export class TemperatureContext {
  convertTo: ConvertToTypes;
  convertFrom: ConvertFromTypes;
}

interface Temperature {
  calculate(temperature: number): string;
}

class Validator {
  context: TemperatureContext;
  constructor(context: TemperatureContext) {
    this.context = context;
  }
  validate() {
    if (+this.context.convertFrom === +this.context.convertTo) {
      throw new Error('Cannot convert to same type.');
    } else {
      return true;
    }
  }
}



//#endregion

class ToFahrenheitTemperature implements Temperature {
  context: TemperatureContext;
  validator: Validator;

  constructor(context: TemperatureContext) {
    this.context = context;
    this.validator = new Validator(this.context);
  }
  calculate(temperature: number): string {
    if (this.validator.validate()) {
      let result = 0;
      if (this.context.convertFrom === ConvertFromTypes.KELVIN) {
        result = Math.round((temperature - 273.15) * 1.8 + 32);
      } else if (this.context.convertFrom === ConvertFromTypes.CELSIUS) {
        result = Math.round(temperature * 1.8 + 32);
      }

      return result.toString() + ' &#8457;';
    }
  }
}

class ToCelsiusTemperature implements Temperature {
  context: TemperatureContext;
  validator: Validator;

  constructor(context: TemperatureContext) {
    this.context = context;
    this.validator = new Validator(this.context);
  }
  calculate(temperature: number): string {
    if (this.validator.validate()) {
      let result = 0;
      if (this.context.convertFrom === ConvertFromTypes.FAHRENHEIT) {
        result = Math.round((temperature - 32) * 0.55555555);
      } else if (this.context.convertFrom === ConvertFromTypes.KELVIN) {
        result = Math.round(temperature - 273.15);
      }

      return result.toString() + ' &#8451;';
    }
  }
}

class ToKelvinTemperature implements Temperature {
  context: TemperatureContext;
  validator: Validator;

  constructor(context: TemperatureContext) {
    this.context = context;
    this.validator = new Validator(this.context);
  }
  calculate(temperature: number): string {
    if (this.validator.validate()) {
      let result = 0;
      if (this.context.convertFrom === ConvertFromTypes.CELSIUS) {
        result = temperature + 273.15;
      } else if (this.context.convertFrom === ConvertFromTypes.FAHRENHEIT) {
        result = Math.round((temperature - 32) * 0.55555555) + 273.15;
      }

      return result.toString() + '&#8490;';
    }
  }
}


//#region Parent Strategy class
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
    this.list.set(ConvertToTypes.TOKELVIN, new ToKelvinTemperature(this.context));
  }
}

//#endregion
