import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { SetActiveDirective } from './directives/set-active.directive';

@NgModule({
  imports: [
    CommonModule,
    // LayoutModule
  ],
  declarations: [SetActiveDirective],
  exports: [
    // LayoutModule,
    SetActiveDirective
  ]
})
export class SharedModule { }
