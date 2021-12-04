import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { BOOTSTRAP_ZINDEX } from "../../../models/bootstrap-zindex";


@Injectable()
export class ScpBackdropService {

  private readonly backdropClassList: string[] = [ 'backdrop', 'dark' ];
  private readonly animationProperties = {
    duration: 200,
    easing: 'linear',
  };

  private backdropElement: HTMLElement | undefined;
  private renderer: Renderer2;
  private beingDestroyed = false;

  constructor(rendererFactory: RendererFactory2, @Inject(DOCUMENT) private document: Document) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  create() {
    if (this.backdropElement) return;

    this.backdropElement = this.document.createElement('div');
    this.backdropClassList.forEach(className => {
      this.renderer.addClass(this.backdropElement, className);
    });
    this.renderer.setStyle(this.backdropElement, 'z-index', BOOTSTRAP_ZINDEX.backdrop);

    this.renderer.setStyle(this.backdropElement, 'transition',
      `opacity ${this.animationProperties.easing} ${this.animationProperties.duration}ms`);
    this.renderer.setStyle(this.backdropElement, 'opacity', 0);
    setTimeout(() => {
      this.renderer.setStyle(this.backdropElement, 'opacity', 1);
    });

    this.renderer.appendChild(this.document.body, this.backdropElement);
    this.renderer.addClass(this.document.body, 'modal-open');
  }

  destroy() {
    if (this.backdropElement && !this.beingDestroyed) {
      this.renderer.setStyle(this.backdropElement, 'opacity', 0);
      this.beingDestroyed = true;
      setTimeout(() => {
        this.renderer.removeClass(this.document.body, 'modal-open');
        this.renderer.removeChild(this.document.body, this.backdropElement);
        this.backdropElement = undefined;
        this.beingDestroyed = false;
      }, this.animationProperties.duration);
    }
  }

}
