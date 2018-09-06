import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WithoutComponent } from './without.component';

const routes: Routes = [
  { path: '', component: WithoutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WithoutRoutingModule { }
