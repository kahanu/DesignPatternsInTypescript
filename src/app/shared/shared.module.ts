import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentHostDirective } from '../dynamic/component-host.directive';
import { DynamicContentComponent } from '../dynamic/dynamic-content/dynamic-content.component';
import { FloatingCartComponent } from '../patterns/state-pattern/examples/floating-cart/floating-cart.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
  declarations: [ComponentHostDirective, DynamicContentComponent, FloatingCartComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ComponentHostDirective,
    DynamicContentComponent,
    FloatingCartComponent
  ]
})
export class SharedModule {}
