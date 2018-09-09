import { Component, OnInit } from '@angular/core';
import { faPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormArray } from '@angular/forms';
import {
  Bank,
  Branch,
  BranchAccount,
  BankAccountForm
} from '../../../../shared/models/patterns/mediator/models';
import { MediatorService } from '../../../../core/services/patterns/mediator/mediator.service';
import { CommonFormGroups } from '../../../../shared/formgroups/common';
import {
  Mediator,
  BankingMediator,
  Colleague,
  BankColleague,
  eventState,
  BranchColleague,
  ClearButtonColleague,
  ShowAccountsColleague,
  JsonResultColleague
} from './pattern/mediator';
import { UIStateContext } from './pattern/state-context';

@Component({
  selector: 'app-with',
  templateUrl: './with.component.html',
  styleUrls: ['./with.component.css']
})
export class WithComponent implements OnInit {
  faPlus = faPlus;
  faTimesCircle = faTimesCircle;

  form: FormGroup;
  bankList: Bank[] = [];
  // branchList: Branch[] = [];
  accountList: BranchAccount[] = [];

  selectedBank: Bank;
  selectedBranch: Branch;

  branchesDisabled = true;
  // showAccounts: boolean;
  // isDisabled: boolean;

  // result: any;

  uiStateContext: UIStateContext = new UIStateContext();
  mediator: Mediator;
  bankColleague: Colleague;
  branchColleague: Colleague;
  jsonResultColleague: Colleague;
  clearColleague: Colleague;
  showAccountsColleague: Colleague;

  constructor(
    private mediatorService: MediatorService,
    private commonFormGroups: CommonFormGroups
  ) {}

  ngOnInit() {
    // this.isDisabled = true;
    this.initForm();
    this.getBanks();

    this.uiStateContext.form = this.form;

    this.mediator = new BankingMediator(this.uiStateContext);
    this.bankColleague = new BankColleague(this.mediator);
    this.branchColleague = new BranchColleague(this.mediator);
    this.jsonResultColleague = new JsonResultColleague(this.mediator);
    this.clearColleague = new ClearButtonColleague(this.mediator);
    this.showAccountsColleague = new ShowAccountsColleague(this.mediator);

    this.mediator.register(this.bankColleague);
    this.mediator.register(this.branchColleague);
    this.mediator.register(this.jsonResultColleague);
    this.mediator.register(this.clearColleague);
    this.mediator.register(this.showAccountsColleague);
    this.uiStateContext.isDisabled = true;
  }

  getBanks() {
    this.mediatorService.getAll('mediator/banks.json').subscribe(res => {
      if (res.success) {
        const bankList = res['bankList'] as Bank[];
        this.bankList.length = 0;
        this.bankList = bankList;
        // this.bankList.unshift({ id: null, name: 'Select Bank' });
        // this.form.get('bankId').setValue('Select Bank', {onlySelf: true});
        this.form.get('branchId').disable();
      }
    });
  }

  onBankChange(e: any) {
    console.log('bank e: ', e);
    // this.showAccounts = false;
    // this.result = null;
    const bank = this.bankList.find(item => item.id === e);
    if (bank) {
      // this.form.get('branchId').enable();
      this.getBranches(e);
      this.bankColleague.send(eventState.bankSelected);
    } else {
      this.uiStateContext.branchList.length = 0;
      // this.form.get('branchId').disable();
      this.bankColleague.send(eventState.bankNotSelected);
    }
  }

  getBranches(id: string) {
    const bank = this.bankList.find(item => item.id === id);
    console.log('bank: ', bank);
    this.selectedBank = bank;
    if (bank) {
      const branches = bank['branches'];
      this.uiStateContext.branchList.length = 0;
      this.uiStateContext.branchList = branches;
      // this.form.get('branchId').setValue('Select Branch', {onlySelf: true});
      // this.uiStateContext.branchList.unshift({ id: null, bankId: id, name: 'Select Branch' });
      // this.form.get('branchId').enable();
    }
  }

  onSelectBranch(e: any) {
    const branch = this.uiStateContext.branchList.find(item => item.id === e);
    if (branch) {
      this.bankColleague.send(eventState.branchSelected);
      // this.showAccounts = true;
      // this.isDisabled = false;
      const accts = branch['accounts'];
      const accounts = <FormArray>this.form.get('accounts');
      accounts.controls.length = 0;
      if (accts.length > 0) {
        accts.forEach(element => {
          accounts.push(this.commonFormGroups.initAccountForm(element));
        });
      } else {
        this.addAccount();
      }
    } else {
      // this.showAccounts = false;
      this.bankColleague.send(eventState.branchNotSelected);
    }
  }

  initForm(model?: BankAccountForm) {
    this.form = this.commonFormGroups.initBankForm(model);
  }

  removeAccount(i: number) {
    const acct = <FormArray>this.form.get('accounts');
    acct.removeAt(i);
  }

  addAccount() {
    const acct = <FormArray>this.form.get('accounts');
    acct.push(this.commonFormGroups.initAccountForm());
  }

  save() {
    this.bankColleague.send(eventState.save);
  }

  clearForm() {
    this.bankColleague.send(eventState.clearForm);
  }
}
