import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WithoutRoutingModule } from './without-routing.module';
import { WithoutComponent } from './without.component';

@NgModule({
  imports: [
    CommonModule,
    WithoutRoutingModule
  ],
  declarations: [WithoutComponent]
})
export class WithoutModule { }
