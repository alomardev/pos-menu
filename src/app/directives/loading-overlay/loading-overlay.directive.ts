import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

const OPACITY_VALUE = 0.45;

@Directive({
  selector: '[scpLoadingOverlay]',
})
export class ScpLoadingOverlayDirective implements AfterViewInit, OnChanges {

  private readonly loadingBlockerContainerCssClass = 'loading-blocker-container';
  private readonly loadingBlockerCssClass = 'loading-blocker';

  @Input() scpLoadingOverlay = true;
  @Input() overlayType: 'opacity' | 'visibility' = 'visibility';

  private nativeElement: HTMLElement;
  private spinnerElement!: HTMLElement;

  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.nativeElement = this.element.nativeElement;
  }

  ngAfterViewInit(): void {
    this.renderer.addClass(this.nativeElement, this.loadingBlockerContainerCssClass);

    this.spinnerElement = this.renderer.createElement('span');
    this.renderer.addClass(this.spinnerElement, this.loadingBlockerCssClass);
    this.renderer.appendChild(this.nativeElement, this.spinnerElement);

    // Text should be in an element to apply overlay opacity and visibility
    this.wrapTextNodesWithSpan();

    this.toggleLoadingBlocker();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['scpLoadingOverlay'] && !changes['scpLoadingOverlay'].isFirstChange()) {
      this.toggleLoadingBlocker();
    }
  }

  toggleLoadingBlocker() {
    if (this.scpLoadingOverlay) {
      this.nativeElement.childNodes.forEach((node) => {
        if (node instanceof HTMLElement && node !== this.spinnerElement) {
          this.resolveOverlay(node, true);
        }
      });
      this.renderer.setStyle(this.spinnerElement, 'visibility', 'visible');
    } else {
      this.nativeElement.childNodes.forEach((node) => {
        if (node instanceof HTMLElement && node !== this.spinnerElement) {
          this.resolveOverlay(node, false);
        }
      });
      this.renderer.setStyle(this.spinnerElement, 'visibility', 'hidden');
    }
  }

  private wrapTextNodesWithSpan() {
    const textNodes: ChildNode[] = [];
    for (let i = 0; i < this.nativeElement.childNodes.length; i++) {
      if (this.nativeElement.childNodes[i].nodeName === '#text') {
        textNodes.push(this.nativeElement.childNodes[i]);
      }
    }

    for (const textNode of textNodes) {
      const span = this.renderer.createElement('span');
      this.renderer.insertBefore(this.nativeElement, span, textNode);
      this.renderer.appendChild(span, textNode);
    }
  }

  private resolveOverlay(node: HTMLElement, enable: boolean) {
    if (enable) {
      if (this.overlayType === 'opacity') {
        this.renderer.setStyle(node, 'opacity', `${OPACITY_VALUE}`);
      } else if (this.overlayType === 'visibility') {
        this.renderer.setStyle(node, 'visibility', 'hidden');
      }
    } else {
      this.renderer.removeStyle(node, this.overlayType);
    }
  }
}
