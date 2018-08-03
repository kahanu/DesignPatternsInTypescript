import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediatorPatternRoutingModule } from './mediator-pattern-routing.module';
import { MediatorPatternComponent } from './mediator-pattern.component';

@NgModule({
  imports: [
    CommonModule,
    MediatorPatternRoutingModule
  ],
  declarations: [MediatorPatternComponent]
})
export class MediatorPatternModule { }
