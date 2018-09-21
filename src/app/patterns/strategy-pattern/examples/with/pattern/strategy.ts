//#region Enums and interfaces
export enum ConvertToTypes {
  FAHRENHEIT,
  CELSIUS,
  KELVIN
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
  formula: Formula;

  constructor(context: TemperatureContext, formula: Formula) {
    this.context = context;
    this.validator = new Validator(this.context);
    this.formula = formula;
  }

  calculate(temperature: number): string {
    if (this.validator.validate()) {
      let result = 0;
      // if (this.context.convertFrom === ConvertFromTypes.KELVIN) {
      //   result = Math.round((temperature - 273.15) * 1.8 + 32);
      // } else if (this.context.convertFrom === ConvertFromTypes.CELSIUS) {
      //   result = Math.round(temperature * 1.8 + 32);
      // }

      result = this.formula.calculate(temperature);

      return result.toString() + ' &#8457;';
    }
  }
}

class ToCelsiusTemperature implements Temperature {
  context: TemperatureContext;
  validator: Validator;
  formula: Formula;

  constructor(context: TemperatureContext, formula: Formula) {
    this.context = context;
    this.validator = new Validator(this.context);
    this.formula = formula;
  }
  calculate(temperature: number): string {
    if (this.validator.validate()) {
      let result = 0;
      // if (this.context.convertFrom === ConvertFromTypes.FAHRENHEIT) {
      //   result = Math.round((temperature - 32) * 0.55555555);
      // } else if (this.context.convertFrom === ConvertFromTypes.KELVIN) {
      //   result = Math.round(temperature - 273.15);
      // }

      result = this.formula.calculate(temperature);

      return result.toString() + ' &#8451;';
    }
  }
}

class ToKelvinTemperature implements Temperature {
  context: TemperatureContext;
  validator: Validator;
  formula: Formula;

  constructor(context: TemperatureContext, formula: Formula) {
    this.context = context;
    this.validator = new Validator(this.context);
    this.formula = formula;
  }

  calculate(temperature: number): string {
    if (this.validator.validate()) {
      let result = 0;
      // if (this.context.convertFrom === ConvertFromTypes.CELSIUS) {
      //   result = temperature + 273.15;
      // } else if (this.context.convertFrom === ConvertFromTypes.FAHRENHEIT) {
      //   result = Math.round((temperature - 32) * 0.55555555) + 273.15;
      // }
      result = this.formula.calculate(temperature);

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
    this.list.set(ConvertToTypes.CELSIUS, new ToCelsiusTemperature(this.context, new ToCelsiusFormula(this.context.convertFrom)));
    this.list.set(ConvertToTypes.FAHRENHEIT, new ToFahrenheitTemperature(this.context, new ToFahrenheitFormula(this.context.convertFrom)));
    this.list.set(ConvertToTypes.KELVIN, new ToKelvinTemperature(this.context, new ToKelvinFormula(this.context.convertFrom)));
  }
}

//#endregion



//#region Strategy classes for determining temperature calculations

interface Formula {
  calculate(temperature: number): number;
}

class ToKelvinFormula implements Formula {
  list: Map<ConvertFromTypes, Formula> = new Map<ConvertFromTypes, Formula>();
  fromTypes: ConvertFromTypes;

  constructor(fromTypes: ConvertFromTypes) {
    this.fromTypes = fromTypes;
    this.defineInstances();
  }

  calculate(temperature: number): number {
    return this.list.get(this.fromTypes).calculate(temperature);
  }

  defineInstances() {
    this.list.set(ConvertFromTypes.CELSIUS, new CelsiusToKelvinFormula());
    this.list.set(ConvertFromTypes.FAHRENHEIT, new FahrenheitToKelvinFormula());
  }
}

class CelsiusToKelvinFormula implements Formula {
  calculate(temperature: number): number {
    return temperature + 273.15;
  }
}

class FahrenheitToKelvinFormula implements Formula {
  calculate(temperature: number): number {
    return Math.round((temperature - 32) * 0.55555555) + 273.15;
  }
}





class ToCelsiusFormula implements Formula {
  list: Map<ConvertFromTypes, Formula> = new Map<ConvertFromTypes, Formula>();
  fromTypes: ConvertFromTypes;

  constructor(fromTypes: ConvertFromTypes) {
    this.fromTypes = fromTypes;
    this.defineInstances();
  }

  calculate(temperature: number): number {
    return this.list.get(this.fromTypes).calculate(temperature);
  }

  defineInstances() {
    this.list.set(ConvertFromTypes.KELVIN, new KelvinToCelsiusFormula());
    this.list.set(ConvertFromTypes.FAHRENHEIT, new FahrenheitToCelsiusFormula());
  }
}


class FahrenheitToCelsiusFormula implements Formula {
  calculate(temperature: number): number {
    return Math.round((temperature - 32) * 0.55555555);
  }
}

class KelvinToCelsiusFormula implements Formula {
  calculate(temperature: number): number {
    return Math.round(temperature - 273.15);
  }
}







class ToFahrenheitFormula implements Formula {
  list: Map<ConvertFromTypes, Formula> = new Map<ConvertFromTypes, Formula>();
  fromTypes: ConvertFromTypes;

  constructor(fromTypes: ConvertFromTypes) {
    this.fromTypes = fromTypes;
    this.defineInstances();
  }

  calculate(temperature: number): number {
    return this.list.get(this.fromTypes).calculate(temperature);
  }

  defineInstances() {
    this.list.set(ConvertFromTypes.KELVIN, new KelvinToFahrenheitFormula());
    this.list.set(ConvertFromTypes.CELSIUS, new CelsiusToFahrenheitFormula());
  }
}

class KelvinToFahrenheitFormula implements Formula {
  calculate(temperature: number): number {
    return Math.round((temperature - 273.15) * 1.8 + 32);
  }
}

class CelsiusToFahrenheitFormula implements Formula {
  calculate(temperature: number): number {
    return Math.round(temperature * 1.8 + 32);
  }
}


//#endregion

