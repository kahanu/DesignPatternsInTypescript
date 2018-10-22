/// <reference path="../../node_modules/typescript/lib/lib.es6.d.ts" />
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './shared/layout/layout.module';
import { CoreModule } from './core/core.module';
import { CARTCOMPONENTS } from './patterns/state-pattern/examples/with/components/cart';

@NgModule({
  declarations: [
    AppComponent,
    ...CARTCOMPONENTS
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LayoutModule,
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ...CARTCOMPONENTS
  ]
})
export class AppModule { }
