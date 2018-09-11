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
  send(state: eventState, colleague: Colleague, includeSelf: boolean);
}

export abstract class Colleague {
  mediator: Mediator;

  constructor(m: Mediator) {
    this.mediator = m;
  }

  send(state: eventState, includeSelf = false): void {
    this.mediator.send(state, this, includeSelf);
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

  send(state: eventState, originator: Colleague, includeSelf = false) {
    this.colleageList.forEach(item => {
      if (includeSelf) {
        item.receive(state, this.uiStateContext);
      } else if (item !== originator) {
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
      ui.clearButtonIsDisabled = true;
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
      ui.branchList.length = 0;
      ui.form.get('branchId').disable();
      ui.clearButtonIsDisabled = true;
    }
  }
}

export class ClearButtonColleague extends Colleague {
  constructor(m: Mediator) {
    super(m);
  }

  receive(state: eventState, ui: UIStateContext) {
    if (state === eventState.branchSelected
      || state === eventState.save) {
      ui.clearButtonIsDisabled = false;
    } else {
      ui.clearButtonIsDisabled = true;
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

export class SaveButtonColleague extends Colleague {
  constructor(m: Mediator) {
    super(m);
  }

  receive(state: eventState, ui: UIStateContext) {
    // nothing needed here.  The button will be enabled or disabled
    // based on the form validity.  But it's needed to send
    // event notifications to the mediator that colleagues will receive.
  }
}


//#endregion
