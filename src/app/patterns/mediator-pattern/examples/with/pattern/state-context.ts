import { FormGroup } from '@angular/forms';
import { Branch } from '../../../../../shared/models/patterns/mediator/models';

export class UIStateContext {
  showAccounts: boolean;
  clearButtonIsDisabled: boolean;
  result: any;
  form: FormGroup;
  branchList: Branch[] = [];
}
