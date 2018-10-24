import { NgModule } from '@angular/core';

import { WithoutRoutingModule } from './without-routing.module';
import { WithoutComponent } from './without.component';
import { SharedModule } from '../../../../shared/shared.module';
import { CartProgressBarComponent } from './components/cart-progress-bar/cart-progress-bar.component';

@NgModule({
  imports: [SharedModule, WithoutRoutingModule],
  declarations: [WithoutComponent, CartProgressBarComponent]
})
export class WithoutModule {}
