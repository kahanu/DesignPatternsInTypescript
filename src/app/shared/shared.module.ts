import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentHostDirective } from '../dynamic/component-host.directive';
import { DynamicContentComponent } from '../dynamic/dynamic-content/dynamic-content.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
  declarations: [ComponentHostDirective, DynamicContentComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ComponentHostDirective,
    DynamicContentComponent
  ]
})
export class SharedModule {}
