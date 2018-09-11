import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BranchAccount, Bank, BankAccountForm } from '../models/patterns/mediator/models';

@Injectable()
export class CommonFormGroups {

  constructor(private fb: FormBuilder) {}

  //#region Banking FormGroups

  initAccountForm(model?: BranchAccount) {
    return this.fb.group({
      id: [model ? model.id : ''],
      accountNumber: [model ? model.accountNumber : '', [Validators.required]]
    });
  }

  initAccountsArray(model?: BranchAccount[]) {
    let arr = this.fb.array([this.initAccountForm()]);

    if (model) {
      const fgs = model.map(item => this.initAccountForm(item));
      arr = this.fb.array(fgs);
    }

    return arr;
  }

  initBankForm(model?: BankAccountForm) {
    return this.fb.group({
      id: [model ? model.id : '0'],
      bankId: [model ? model.bankId : '0'],
      branchId: [model ? model.branchId : '0'],
      accounts:  this.initAccountsArray()
    });
  }

  //#endregion


}
