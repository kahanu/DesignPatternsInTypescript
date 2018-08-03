import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MediatorPatternComponent } from './mediator-pattern.component';

const routes: Routes = [
  { path: '', component: MediatorPatternComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediatorPatternRoutingModule { }
