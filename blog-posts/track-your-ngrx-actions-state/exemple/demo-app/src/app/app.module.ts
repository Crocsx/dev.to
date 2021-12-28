import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';

import { SpinnerComponent } from './spinner/spinner.component';
import { UserEffect } from './stores/users/effect';

import { reducer as loaderReducer } from './stores/loaders/reducer';
import { reducer as userReducer } from './stores/users/reducer';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([UserEffect]),
    StoreModule.forRoot({
      loaders: loaderReducer,
      users: userReducer,
    }),
  ],
  declarations: [AppComponent, SpinnerComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
