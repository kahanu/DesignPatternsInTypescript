import { NgModule } from '@angular/core';

import { WithoutRoutingModule } from './without-routing.module';
import { WithoutComponent } from './without.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    WithoutRoutingModule
  ],
  declarations: [WithoutComponent]
})
export class WithoutModule { }
