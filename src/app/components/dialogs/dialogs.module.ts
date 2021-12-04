import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ScpBackdropService } from "./services/backdrop.service";
import { ScpLoadingOverlayModule } from "../../directives/loading-overlay/loading-overlay.module";
import { ScpCustomEventsModules } from "../../directives/custom-events/custom-events.module";
import { ScpDialogComponent } from "./dialog/dialog.component";
import { ScpDialogManager } from "./services/dialog-manager.service";
import { ScpDynamicDialogsService } from "./services/dynamic-dialogs.service";
import { ScpIconModule } from "../../directives/icon/icon.module";

@NgModule({
  declarations: [
    ScpDialogComponent,
  ],
  imports: [
    CommonModule,
    ScpIconModule,
    ScpCustomEventsModules,
    ScpLoadingOverlayModule,
  ],
  exports: [
    ScpDialogComponent
  ],
  providers: [
    ScpDynamicDialogsService,
    ScpBackdropService,
    ScpDialogManager,
  ]
})
export class ScpDialogsModule { }
