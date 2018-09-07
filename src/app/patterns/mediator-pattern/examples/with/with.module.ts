import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WithRoutingModule } from './with-routing.module';
import { WithComponent } from './with.component';

@NgModule({
  imports: [
    CommonModule,
    WithRoutingModule
  ],
  declarations: [WithComponent]
})
export class WithModule { }
