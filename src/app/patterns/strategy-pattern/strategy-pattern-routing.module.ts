import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StrategyPatternComponent } from './strategy-pattern.component';

const routes: Routes = [
  { path: '', component: StrategyPatternComponent },
  { path: 'with', loadChildren: 'app/patterns/strategy-pattern/examples/with/with.module#WithModule' },
  { path: 'without', loadChildren: 'app/patterns/strategy-pattern/examples/without/without.module#WithoutModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StrategyPatternRoutingModule { }
