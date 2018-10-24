import { NgModule } from '@angular/core';

import { StatePatternRoutingModule } from './state-pattern-routing.module';
import { StatePatternComponent } from './state-pattern.component';
import { SharedModule } from '../../shared/shared.module';
import { FloatingCartComponent } from './examples/floating-cart/floating-cart.component';

@NgModule({
  imports: [
    SharedModule,
    StatePatternRoutingModule
  ],
  declarations: [StatePatternComponent]
})
export class StatePatternModule { }
