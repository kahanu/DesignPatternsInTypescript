export class Entity {
  id: any;
}

//#region Bank Models

export class Bank extends Entity {
  name: string;
}

export class Branch extends Entity {
  bankId: any;
  name: string;
}

export class BranchAccount extends Entity {
  branchId: any;
  accountNumber: string;
}

export class BankAccountForm extends Entity {
  bankId: string;
  branchId: string;
  accounts: BranchAccount[] = [];
}

//#endregion
