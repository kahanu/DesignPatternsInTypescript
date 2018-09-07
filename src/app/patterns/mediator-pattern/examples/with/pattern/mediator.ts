import { UIStateContext } from './state-context';
import { FormArray } from '@angular/forms';

export enum BankState {
  init,
  bankSelected,
  bankNotSelected,
  branchSelected,
  branchNotSelected,
  save,
  clearForm
}

export interface Mediator {
  register(control: Colleague);
  send(state: BankState, colleague: Colleague);
}

export abstract class Colleague {
  mediator: Mediator;

  constructor(m: Mediator) {
    this.mediator = m;
  }

  send(state: BankState): void {
    this.mediator.send(state, this);
  }

  abstract receive(state: BankState, ui: UIStateContext);
}

export class BankingMediator implements Mediator {
  private colleageList: Array<Colleague>;

  constructor(private uiStateContext: UIStateContext) {
    this.colleageList = [];
  }

  register(control: Colleague) {
    this.colleageList.push(control);
  }

  send(state: BankState, originator: Colleague) {
    this.colleageList.forEach(item => {
      if (item !== originator) {
        item.receive(state, this.uiStateContext);
      }
    });
  }
}

export class BankColleague extends Colleague {
  constructor(m: Mediator) {
    super(m);
  }

  receive(state: BankState, ui: UIStateContext) {
    if (state === 0) {
      ui.isDisabled = true;
    }
  }
}

export class BranchColleague extends Colleague {

  constructor(m: Mediator) {
    super(m);
  }

  receive(state: BankState, ui: UIStateContext) {
    if (state === 1) {
      // bank selected
      ui.showAccounts = false;
      ui.result = null;
      ui.form.get('branchId').enable();
    } else if (state === 2) {
      // bank not selected
      ui.form.reset();
      ui.form.get('branchId').disable();
      ui.branchList.length = 0;
      ui.showAccounts = false;
      ui.result = null;
      ui.isDisabled = true;
    } else if (state === 3) {
      // branch selected
      ui.showAccounts = true;
      ui.isDisabled = false;
    } else if (state === 4) {
      // branch not selected
      ui.showAccounts = false;
      ui.isDisabled = true;
    }
  }
}

export class SaveColleague extends Colleague {
  constructor(m: Mediator) {
    super(m);
  }

  receive(state: BankState, ui: UIStateContext) {
    if (state === 5) {
      ui.result = JSON.stringify(ui.form.value, null, 2);
    }
  }
}

export class ClearColleague extends Colleague {
  constructor(m: Mediator) {
    super(m);
  }

  receive(state: BankState, ui: UIStateContext) {
    if (state === 6) {
      ui.branchList.length = 0;
      ui.form.reset();
      ui.showAccounts = false;
      ui.result = null;
      const ctrl = ui.form.get('branchId');
      ctrl.disable();
    }
  }
}
