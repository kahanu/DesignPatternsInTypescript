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
  JsonResultColleague,
  SaveButtonColleague
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
  accountList: BranchAccount[] = [];

  selectedBank: Bank;
  selectedBranch: Branch;

  /** Setup the Mediator pattern to manage the UI control states. */
  uiStateContext: UIStateContext = new UIStateContext();
  mediator: Mediator;
  bankColleague: Colleague;
  branchColleague: Colleague;
  jsonResultColleague: Colleague;
  clearColleague: Colleague;
  showAccountsColleague: Colleague;
  saveButtonColleague: Colleague;

  constructor(
    private mediatorService: MediatorService,
    private commonFormGroups: CommonFormGroups
  ) {}

  ngOnInit() {
    this.initForm();
    this.getBanks();

    this.uiStateContext.form = this.form;

    this.mediator = new BankingMediator(this.uiStateContext);
    this.bankColleague = new BankColleague(this.mediator);
    this.branchColleague = new BranchColleague(this.mediator);
    this.jsonResultColleague = new JsonResultColleague(this.mediator);
    this.clearColleague = new ClearButtonColleague(this.mediator);
    this.showAccountsColleague = new ShowAccountsColleague(this.mediator);
    this.saveButtonColleague = new SaveButtonColleague(this.mediator);

    this.mediator.register(this.bankColleague);
    this.mediator.register(this.branchColleague);
    this.mediator.register(this.jsonResultColleague);
    this.mediator.register(this.clearColleague);
    this.mediator.register(this.showAccountsColleague);
    this.mediator.register(this.saveButtonColleague);
    this.uiStateContext.clearButtonIsDisabled = true;

    this.bankColleague.send(eventState.init);
  }

  getBanks() {
    this.mediatorService.getAll('mediator/banks.json').subscribe(res => {
      if (res.success) {
        const bankList = res['bankList'] as Bank[];
        this.bankList.length = 0;
        this.bankList = [...bankList];
      }
    });
  }

  onBankChange(e: any) {
    const bank = this.bankList.find(item => item.id === e);
    if (bank) {
      this.getBranches(e);
      this.bankColleague.send(eventState.bankSelected);
    } else {
      this.bankColleague.send(eventState.bankNotSelected);
    }
  }

  getBranches(id: string) {

    const bank = this.bankList.find(item => item.id === id);

    this.selectedBank = bank;
    if (bank) {
      const branches = bank['branches'];
      this.uiStateContext.branchList.length = 0;
      this.uiStateContext.branchList = branches;
    }
  }

  onSelectBranch(e: any) {
    const branch = this.uiStateContext.branchList.find(item => item.id === e);
    if (branch) {
      this.bankColleague.send(eventState.branchSelected);
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
    this.saveButtonColleague.send(eventState.save);
  }

  clearForm() {
    this.clearColleague.send(eventState.clearForm);
    this.form.reset();
    this.getBanks();
  }
}
