import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { reducer } from './reducer';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('loaders', reducer)],
})
export class LoadersStoreModule {}
