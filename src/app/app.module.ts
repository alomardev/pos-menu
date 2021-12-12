import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewOrderPageComponent } from './pages/new-order-page/new-order-page.component';
import { CounterControlComponent } from './components/counter-control/counter-control.component';
import { ScpIconModule } from './directives/icon/icon.module';
import { ScpDialogsModule } from './components/dialogs/dialogs.module';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScpLoadingOverlayModule } from './directives/loading-overlay/loading-overlay.module';
import { ButtonGroupControlComponent } from './components/button-group-control/button-group-control.component';

@NgModule({
  declarations: [
    AppComponent,
    NewOrderPageComponent,
    CounterControlComponent,
    OrderItemComponent,
    ButtonGroupControlComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ScpLoadingOverlayModule,
    ScpDialogsModule,
    ScpIconModule.forRoot({
      pack: [{
        coloring: 'stroke',
        key: 'app',
        prefix: 'app-',
        svg: 'assets/app-icons.svg',
        name: 'Application Icon Pack',
      }]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
