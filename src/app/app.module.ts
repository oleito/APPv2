import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashpedidosModule } from './pages/dashpedidos/dashpedidos.module';
import { DashtallerModule } from './pages/dashtaller/dashtaller.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    DashpedidosModule,
    DashtallerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
