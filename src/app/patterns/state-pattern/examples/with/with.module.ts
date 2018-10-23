import { NgModule } from '@angular/core';

import { WithRoutingModule } from './with-routing.module';
import { WithComponent } from './with.component';
import { SharedModule } from '../../../../shared/shared.module';
import { CartProgressBarComponent } from './components/cart-progress-bar/cart-progress-bar.component';
import { ViewCartComponent } from './components/cart/view-cart/view-cart.component';

@NgModule({
  imports: [SharedModule, WithRoutingModule],
  declarations: [
    WithComponent,
    CartProgressBarComponent
  ]
})
export class WithModule {}
