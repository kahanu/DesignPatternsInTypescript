import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'mediator', loadChildren: 'app/patterns/mediator-pattern/mediator-pattern.module#MediatorPatternModule' },
  { path: 'strategy', loadChildren: 'app/patterns/strategy-pattern/strategy-pattern.module#StrategyPatternModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatternsRoutingModule { }
