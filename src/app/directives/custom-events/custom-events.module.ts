import { NgModule } from '@angular/core';
import { ScpAfterRenderEventDirective } from './after-render.directive';

@NgModule({
  declarations: [
    ScpAfterRenderEventDirective,
  ],
  exports: [
    ScpAfterRenderEventDirective,
  ]
})
export class ScpCustomEventsModules {}
