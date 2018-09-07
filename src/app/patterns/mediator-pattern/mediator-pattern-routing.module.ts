import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MediatorPatternComponent } from './mediator-pattern.component';

const routes: Routes = [
  { path: '', component: MediatorPatternComponent },
  { path: 'without', loadChildren: 'app/patterns/mediator-pattern/examples/without/without.module#WithoutModule' },
  { path: 'with', loadChildren: 'app/patterns/mediator-pattern/examples/with/with.module#WithModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediatorPatternRoutingModule { }
