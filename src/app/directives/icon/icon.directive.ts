/* eslint-disable @angular-eslint/directive-selector */
import { AfterViewInit, Directive, ElementRef, Inject, Input, Renderer2 } from "@angular/core";
import { CSSLengthValue } from "../../models/css-length-value";
import { getElementClassName } from "../../utils/get-element-class-list";
import { NATIVE_ICON_PACK } from "./constants/native-icon-pack";
import { ICONS_CONFIG } from "./constants/tokens";
import { IconPack, IconsConfig } from "./models/icons-config";

@Directive({
  selector: 'svg[icon], button[icon]',
})
export class ScpIconDirective implements AfterViewInit {

  private static readonly Constants = {
    svgNamespace: 'http://www.w3.org/2000/svg',
    svgClassName: 'svg-icon',
    svgIconInlineClassName: 'icon-inline',
    svgIconBlockClassName: 'icon-block',
    buttonIconClassName: 'icon-button',
  };

  private static readonly Defaults = {
    size: '24px',
    coloring: 'fill',
    color: 'currentColor',
  };

  private _icon!: string;
  @Input() set icon(val: string) {
    this._icon = val;
    this.resolveReference();
  }
  get icon() {
    return this._icon;
  }
  /** @internal */
  iconReference: string | null = null;

  @Input() color?: string = 'currentColor';
  @Input() size?: number | `${number}` | CSSLengthValue | null = null;
  @Input() inline: boolean = true;

  private prefix: string | null = null;
  private name: string | null = null;
  private pack: IconPack | null = null;

  private defaultPack: IconPack;
  private nativeElement: Element | null = null;
  private svgElement: SVGElement | null = null;
  private useElement: SVGUseElement | null = null;

  constructor(
    @Inject(ICONS_CONFIG) private config: IconsConfig,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this.defaultPack = Array.isArray(this.config.pack) ?
      this.config.pack.find(p => p.prefix !== NATIVE_ICON_PACK.prefix) ?? this.config.pack[0] :
      this.config.pack;
  }

  ngAfterViewInit() {
    if (!this.pack || !(this.nativeElement = this.elementRef.nativeElement)) return;

    // Capture svg element
    if (this.nativeElement.tagName.toLowerCase() === 'svg') {
      this.svgElement = this.nativeElement as SVGElement;
    } else {
      this.svgElement = this.renderer.createElement('svg', ScpIconDirective.Constants.svgNamespace) as SVGElement;
      this.renderer.appendChild(this.nativeElement, this.svgElement);
      this.resolveHostClassName();
    }

    // Create `use` element
    this.useElement = this.renderer.createElement('use', ScpIconDirective.Constants.svgNamespace) as SVGUseElement;
    this.renderer.appendChild(this.svgElement, this.useElement);
    this.renderer.setAttribute(this.useElement, 'href', this.iconReference ?? '');

    this.applySvgClassList();
    this.applySize();
    this.applyColor();
  }

  private applyColor() {
    if (!this.pack || !this.svgElement) return;

    const color = this.color ?? 'currentColor';
    const coloring = this.pack.coloring ?? ScpIconDirective.Defaults.coloring;

    if (coloring === 'stroke') {
      if (!this.svgElement.hasAttribute('fill')) {
        this.renderer.setAttribute(this.svgElement, 'fill', 'none');
      }
      if (!this.svgElement.hasAttribute('stroke')) {
        this.renderer.setAttribute(this.svgElement, 'stroke', color);
      }
    } else if (coloring === 'fill') {
      if (!this.svgElement.hasAttribute('fill')) {
        this.renderer.setAttribute(this.svgElement, 'fill', color);
      }
      if (!this.svgElement.hasAttribute('stroke')) {
        this.renderer.setAttribute(this.svgElement, 'stroke', 'none');
      }
    }
  }

  private applySize() {
    if (!this.pack) return;
    const defaultSize = this.pack.size ?? ScpIconDirective.Defaults.size;
    this.renderer.setAttribute(this.svgElement, 'width', this.getLiteralSize(defaultSize));
    this.renderer.setAttribute(this.svgElement, 'height', this.getLiteralSize(defaultSize));
    if (this.size) {
      this.renderer.setStyle(this.svgElement, 'width', this.getLiteralSize(this.size));
      this.renderer.setStyle(this.svgElement, 'height', this.getLiteralSize(this.size));
    }
  }

  private applySvgClassList() {
    if (!this.pack || !this.svgElement) return;

    [ScpIconDirective.Constants.svgClassName, `scp-icon-pack-${this.pack.key}`].forEach(c => {
      this.renderer.addClass(this.svgElement, c);
    });

    // Assign default 'inline-block' class name to the svg
    if (this.inline && getElementClassName(this.svgElement)?.indexOf(ScpIconDirective.Constants.svgIconBlockClassName) === -1) {
      this.renderer.addClass(this.svgElement, ScpIconDirective.Constants.svgIconInlineClassName);
    } else if (getElementClassName(this.svgElement)?.indexOf(ScpIconDirective.Constants.svgIconInlineClassName) === -1) {
      this.renderer.addClass(this.svgElement, ScpIconDirective.Constants.svgIconBlockClassName);
    }
  }

  private resolveHostClassName() {
    if (!this.nativeElement) return;

    if (this.nativeElement.tagName === 'BUTTON') {
      this.renderer.addClass(this.nativeElement, ScpIconDirective.Constants.buttonIconClassName);
    }
  }

  private getLiteralSize(size: number | string) {
    return isNaN(Number(size)) ? size as string : `${size}px`;
  }

  private resolveReference() {
    if (!this._icon) return;

    const segs = this._icon.split(':');
    if (segs.length > 1) {
      this.pack = this.getIconPack(segs[0]);
      this.name = segs[1];
    } else {
      this.pack = this.defaultPack;
      this.name = segs[0];
    }
    if (!this.pack) {
      console.warn(`Couldn't find a registered icon pack for '${this._icon}'`);
      return;
    }
    this.prefix = this.pack.prefix;
    if (!this.pack.embedded) {
      this.iconReference = `${this.pack.svg}#${this.prefix}${this.name}`;
    } else {
      this.iconReference = `#${this.prefix}${this.name}`;
    }
  }

  private getIconPack(key: string): IconPack | null {
    return (Array.isArray(this.config.pack) ? this.config.pack : [this.config.pack]).find(pack => {
      return (pack.key ?? pack.name) === key;
    }) ?? null;
  }

}
