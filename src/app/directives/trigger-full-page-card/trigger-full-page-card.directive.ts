import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { hideScrollbars, showScrollbars } from '../../utils/toggle-page-scrolling-function';

@Directive({
  selector: '[scpTriggerFullPageCard]',
})
export class ScpTriggerFullPageCardDirective implements AfterViewInit, OnChanges {
  private readonly FULL_PAGE_CLASS = 'full-page-card';
  @Input() scpTriggerFullPageCard = true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  ngAfterViewInit() {
    this.triggerFullPage();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('scpTriggerFullPageCard')) {
      this.triggerFullPage();
    }
  }

  private triggerFullPage() {
    if (this.scpTriggerFullPageCard) {
      hideScrollbars(this.document.body);
      this.renderer.addClass(this.elementRef.nativeElement, this.FULL_PAGE_CLASS);
    } else {
      showScrollbars(this.document.body);
      this.renderer.removeClass(this.elementRef.nativeElement, this.FULL_PAGE_CLASS);
    }
  }
}
