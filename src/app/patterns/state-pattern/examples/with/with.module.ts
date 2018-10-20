import { NgModule } from '@angular/core';

import { WithRoutingModule } from './with-routing.module';
import { WithComponent } from './with.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    WithRoutingModule
  ],
  declarations: [WithComponent]
})
export class WithModule { }
