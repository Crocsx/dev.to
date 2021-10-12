import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SharedUiModule } from '@demo-app/shared-ui';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SharedUiModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
