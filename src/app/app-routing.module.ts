import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainLayoutComponent } from './shared/layout/app-layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'patterns',
        loadChildren: 'app/patterns/patterns.module#PatternsModule'
      }
    ]
  },
  { path: 'home', component: MainLayoutComponent, loadChildren: 'app/home/home.module#HomeModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
