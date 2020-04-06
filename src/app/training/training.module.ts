import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './components/current-training/current-training.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { PastTrainingComponent } from './components/past-training/past-training.component';
import { TrainingsService } from './services/trainings.service';
import { reducer } from './reducer';

const COMPONENTS = [
  TrainingComponent,
  CurrentTrainingComponent,
  NewTrainingComponent,
  PastTrainingComponent,
];

const MODULES = [
  CommonModule,
  TrainingRoutingModule,
  FlexLayoutModule,
  FormsModule,
  SharedModule
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    ...MODULES,
    StoreModule.forFeature('training', reducer)
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS
  ],
  providers: [
    TrainingsService
  ]
})
export class TrainingModule { }
