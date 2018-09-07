import { FormGroup } from '@angular/forms';
import { Branch } from '../../../../../shared/models/patterns/mediator/models';

export class UIStateContext {
  showAccounts: boolean;
  isDisabled: boolean;
  result: any;
  form: FormGroup;
  branchList: Branch[] = [];
}
