import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatternsRoutingModule } from './patterns-routing.module';
import { MediatorPatternModule } from './mediator-pattern/mediator-pattern.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MediatorPatternModule,
    PatternsRoutingModule
  ],
  declarations: []
})
export class PatternsModule { }
