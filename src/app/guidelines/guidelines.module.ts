import { NgModule } from '@angular/core';

import { GuidelinesRoutingModule } from './guidelines-routing.module';
import { GuidelinesComponent } from './guidelines.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    GuidelinesRoutingModule
  ],
  declarations: [GuidelinesComponent]
})
export class GuidelinesModule { }
