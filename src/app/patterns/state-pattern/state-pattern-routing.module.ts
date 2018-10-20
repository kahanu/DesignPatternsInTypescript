import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatePatternComponent } from './state-pattern.component';

const routes: Routes = [
  { path: '', component: StatePatternComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatePatternRoutingModule { }
