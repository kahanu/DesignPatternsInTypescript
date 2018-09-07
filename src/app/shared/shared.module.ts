import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
  declarations: [],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule]
})
export class SharedModule {}
