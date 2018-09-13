import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StrategyPatternRoutingModule } from './strategy-pattern-routing.module';
import { StrategyPatternComponent } from './strategy-pattern.component';

@NgModule({
  imports: [
    CommonModule,
    StrategyPatternRoutingModule
  ],
  declarations: [StrategyPatternComponent]
})
export class StrategyPatternModule { }
