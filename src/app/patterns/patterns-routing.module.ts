import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'mediator', loadChildren: 'app/patterns/mediator-pattern/mediator-pattern.module#MediatorPatternModule' },
  { path: 'strategy', loadChildren: 'app/patterns/strategy-pattern/strategy-pattern.module#StrategyPatternModule' },
  { path: 'state', loadChildren: 'app/patterns/state-pattern/state-pattern.module#StatePatternModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatternsRoutingModule { }
