import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './guards/module-import.guard';
import { MediatorService } from './services/patterns/mediator/mediator.service';
import { ExceptionService } from './services/exception.service';
import { CommonFormGroups } from '../shared/formgroups/common';
import { PubSubService } from './services/pub-sub/pub-sub.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    CommonFormGroups,
    ExceptionService,
    MediatorService,
    PubSubService
  ],
  declarations: []
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
 }
