import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IconsConfig } from './models/icons-config';
import { ICONS_CONFIG } from './constants/tokens';
import { DOCUMENT } from '@angular/common';
import { ScpIconDirective } from './icon.directive';
import { NATIVE_ICON_PACK } from './constants/native-icon-pack';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  declarations: [ScpIconDirective],
  exports: [ScpIconDirective],
  providers: [
    // Default icon configs
    { provide: ICONS_CONFIG, useValue: { pack: [] } as IconsConfig },

    // When the factory is executed, the default icons config should already be overridden
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [HttpClient, ICONS_CONFIG, DOCUMENT],
      useFactory: configureIcons,
    }
  ]
})
export class ScpIconModule {
  static forRoot(config: IconsConfig): ModuleWithProviders<ScpIconModule> {
    return {
      ngModule: ScpIconModule,
      providers: [
        // Overriding icons config
        { provide: ICONS_CONFIG, useValue: config },
      ]
    }
  }
}

function configureIcons(http: HttpClient, config: IconsConfig, { body }: Document) {
  const configPacks = Array.isArray(config.pack) ? config.pack : [config.pack];
  const packs = [NATIVE_ICON_PACK, ...configPacks];

  // Validation
  for (const p of packs) {
    if (/[^a-zA-Z0-9\-_]/.test(p.key)) {
      throw new Error(`Provided icon pack key '${p.key}' is invalid; no whitespace or special characters other than '-' and '_' are allowed.`);
    }
    if (p !== NATIVE_ICON_PACK) {
      if (p.key === NATIVE_ICON_PACK.key) {
        throw new Error(`The icon pack key '${NATIVE_ICON_PACK.key}' is reserved`);
      }
      if (p.prefix === NATIVE_ICON_PACK.prefix) {
        throw new Error(`The icon pack prefix '${NATIVE_ICON_PACK.prefix}' is reserved`);
      }
    }
  }

  const action = () => {
    packs.forEach(pack => {
      const providedValueHasClosingTag = /<\/[A-Za-z_][A-Za-z0-9-_.]*>/.test(pack.svg);
      if (providedValueHasClosingTag) {
        embedSvgSymbols(pack.svg, body);
      } else if (config.embed !== false) {
        http.get(pack.svg, { responseType: 'text' }).subscribe((result) => {
          embedSvgSymbols(result, body);
        });
      }
      pack.embedded = providedValueHasClosingTag || config.embed !== false;
    });
    config.pack = packs;
  };
  return action;
}

function embedSvgSymbols(svg: string, body: HTMLElement) {
  try {
    const svgDoc = new DOMParser().parseFromString(svg, 'image/svg+xml');
    const svgElement = svgDoc.getElementsByTagName('svg')[0];
    svgElement.style.display = 'none';
    body.insertBefore(svgElement, body.firstChild);
  } catch {
    throw new Error(`Couldn't parse provided svg string`);
  }
}
