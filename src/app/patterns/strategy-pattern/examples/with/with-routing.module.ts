import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WithComponent } from './with.component';

const routes: Routes = [
  { path: '', component: WithComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WithRoutingModule { }
