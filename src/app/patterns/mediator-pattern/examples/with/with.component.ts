import { Component, OnInit } from '@angular/core';
import { faPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormArray } from '@angular/forms';
import { Bank, Branch, BranchAccount, BankAccountForm } from '../../../../shared/models/patterns/mediator/models';
import { MediatorService } from '../../../../core/services/patterns/mediator/mediator.service';
import { CommonFormGroups } from '../../../../shared/formgroups/common';

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
  branchList: Branch[] = [];
  accountList: BranchAccount[] = [];

  selectedBank: Bank;
  selectedBranch: Branch;

  branchesDisabled = true;
  showAccounts: boolean;
  isDisabled: boolean;

  result: any;

  constructor(
    private mediatorService: MediatorService,
    private commonFormGroups: CommonFormGroups
  ) {}

  ngOnInit() {
    this.isDisabled = true;
    this.initForm();
    this.getBanks();
  }

  getBanks() {
    this.mediatorService.getAll('mediator/banks.json').subscribe(res => {
      if (res.success) {
        const bankList = res['bankList'] as Bank[];
        this.bankList.length = 0;
        this.bankList = bankList;
        this.bankList.unshift({ id: null, name: 'Select Bank' });
        this.form.get('branchId').disable();
      }
    });
  }

  onBankChange(e: any) {
    this.showAccounts = false;
    this.result = null;
    const bank = this.bankList.find(item => item.id === e);
    if (bank) {
      this.form.get('branchId').enable();
      this.getBranches(e);
    } else {
      this.branchList.length = 0;
      this.form.get('branchId').disable();
    }
  }

  getBranches(id: string) {
    const bank = this.bankList.find(item => item.id === id);
    this.selectedBank = bank;
    if (bank) {
      const branches = bank['branches'];
      this.branchList.length = 0;
      this.branchList = branches;
      this.branchList.unshift({ id: null, bankId: id, name: 'Select Branch' });
      this.form.get('branchId').enable();
    }
  }

  onSelectBranch(e: any) {
    const branch = this.branchList.find(item => item.id === e);
    if (branch) {
      this.showAccounts = true;
      this.isDisabled = false;
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
      this.showAccounts = false;
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
    this.result = JSON.stringify(this.form.value, null, 2);
  }

  clearForm() {
    this.form.reset();
    this.showAccounts = false;
    this.form.get('branchId').disable();
    this.result = null;
  }
}
