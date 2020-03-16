import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './components/current-training/current-training.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { PastTrainingComponent } from './components/past-training/past-training.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TrainingService } from './services/trainings.service';

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
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS
  ],
  providers: [
    TrainingService
  ]
})
export class TrainingModule { }
