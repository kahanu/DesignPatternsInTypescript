import { Directive, OnInit, Renderer2, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appSetActive]'
})
export class SetActiveDirective implements AfterViewInit {

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngAfterViewInit() {
    console.log('renderer: ', this.renderer, ' - ref: ', this.el);
  }

}
