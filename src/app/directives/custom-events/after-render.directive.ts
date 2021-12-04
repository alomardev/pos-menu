/* eslint-disable @angular-eslint/directive-selector */
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';


@Directive({
  selector: '[afterRender]',
})
export class ScpAfterRenderEventDirective implements AfterViewInit {
  @Output() afterRender = new EventEmitter<ElementRef>();

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    this.afterRender.next(this.element);
    this.afterRender.complete();
  }

}
