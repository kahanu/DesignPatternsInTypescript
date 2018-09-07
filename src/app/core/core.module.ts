import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './guards/module-import.guard';
import { MediatorService } from './services/patterns/mediator/mediator.service';
import { ExceptionService } from './services/exception.service';
import { CommonFormGroups } from '../shared/formgroups/common';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    CommonFormGroups,
    ExceptionService,
    MediatorService
  ],
  declarations: []
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
 }
