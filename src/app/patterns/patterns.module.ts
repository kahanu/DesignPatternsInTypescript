import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PatternsRoutingModule } from './patterns-routing.module';
import { MediatorPatternModule } from './mediator-pattern/mediator-pattern.module';
import { StrategyPatternModule } from './strategy-pattern/strategy-pattern.module';

@NgModule({
  imports: [
    SharedModule,
    MediatorPatternModule,
    StrategyPatternModule,
    PatternsRoutingModule
  ],
  declarations: []
})
export class PatternsModule { }
