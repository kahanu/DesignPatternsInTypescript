import { UIStateContext } from './state-context';
import { FormArray } from '@angular/forms';

//#region Event State
export enum eventState {
  init,
  bankSelected,
  bankNotSelected,
  branchSelected,
  branchNotSelected,
  save,
  clearForm
}

//#endregion

//#region Mediator Interface and abstract Colleague
export interface Mediator {
  register(control: Colleague);
  send(state: eventState, colleague: Colleague);
}

export abstract class Colleague {
  mediator: Mediator;

  constructor(m: Mediator) {
    this.mediator = m;
  }

  send(state: eventState): void {
    this.mediator.send(state, this);
  }

  abstract receive(state: eventState, ui: UIStateContext);
}

//#endregion

//#region BankingMediator
export class BankingMediator implements Mediator {
  private colleageList: Array<Colleague>;

  constructor(private uiStateContext: UIStateContext) {
    this.colleageList = [];
  }

  register(control: Colleague) {
    this.colleageList.push(control);
  }

  send(state: eventState, originator: Colleague) {
    this.colleageList.forEach(item => {
      if (item !== originator) {
        item.receive(state, this.uiStateContext);
      }
    });
  }
}

//#endregion

//#region Concrete Colleagues

export class BankColleague extends Colleague {
  constructor(m: Mediator) {
    super(m);
  }

  receive(state: eventState, ui: UIStateContext) {
    if (state === eventState.init) {
      ui.isDisabled = true;
    }
  }
}

export class BranchColleague extends Colleague {

  constructor(m: Mediator) {
    super(m);
  }

  receive(state: eventState, ui: UIStateContext) {
    if (state === eventState.bankSelected
      || state === eventState.save
      || state === eventState.branchSelected) {
      ui.form.get('branchId').enable();
    } else {
      ui.form.get('branchId').disable();
    }
    // } else if (state === eventState.bankNotSelected) {
    //   ui.form.reset();
    //   ui.form.get('branchId').disable();
    //   ui.branchList.length = 0;
    //   ui.isDisabled = true;
    // } else if (state === eventState.branchSelected) {
    //   ui.isDisabled = false;
    // } else if (state === eventState.branchNotSelected) {
    //   ui.isDisabled = true;
    // }
  }
}

export class ClearButtonColleague extends Colleague {
  constructor(m: Mediator) {
    super(m);
  }

  receive(state: eventState, ui: UIStateContext) {
    if (state === eventState.clearForm) {
      // ui.branchList.length = 0;
      ui.form.reset();
      // ui.result = null;
      // ui.form.get('branchId').disable();
    } else if (state === eventState.branchSelected
      || state === eventState.save) {
      ui.isDisabled = false;
    } else {
      ui.isDisabled = true;
    }
  }
}

export class ShowAccountsColleague extends Colleague {
  constructor(m: Mediator) {
    super(m);
  }

  receive(state: eventState, ui: UIStateContext) {
    if (state === eventState.branchSelected
      || state === eventState.save) {
      ui.showAccounts = true;
    } else {
      ui.showAccounts = false;
    }
  }
}

export class JsonResultColleague extends Colleague {
  constructor(m: Mediator) {
    super(m);
  }

  receive(state: eventState, ui: UIStateContext) {
    if (state === eventState.save) {
      ui.result = JSON.stringify(ui.form.value, null, 2);
    } else {
      ui.result = null;
    }
  }
}



//#endregion
