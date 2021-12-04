import { NgModule } from '@angular/core';
import { ScpLoadingOverlayDirective } from './loading-overlay.directive';

@NgModule({
  declarations: [ScpLoadingOverlayDirective],
  exports: [ScpLoadingOverlayDirective],
})
export class ScpLoadingOverlayModule {}
