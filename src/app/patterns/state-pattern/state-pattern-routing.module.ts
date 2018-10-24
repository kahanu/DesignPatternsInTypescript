import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatePatternComponent } from './state-pattern.component';
import { WithComponent } from './examples/with/with.component';

const routes: Routes = [
  { path: '', component: StatePatternComponent },
  { path: 'with', loadChildren: 'app/patterns/state-pattern/examples/with/with.module#WithModule' },
  { path: 'without', loadChildren: 'app/patterns/state-pattern/examples/without/without.module#WithoutModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatePatternRoutingModule { }
