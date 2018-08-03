import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './app-layouts/main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { PrimaryNavComponent } from './navigation/primary-nav/primary-nav.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [MainLayoutComponent, PrimaryNavComponent]
})
export class LayoutModule { }
