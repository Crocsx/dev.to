import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserEffect } from './effect';
import { reducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('users', reducer),
    EffectsModule.forFeature([UserEffect]),
  ],
})
export class UserStoreModule {}
