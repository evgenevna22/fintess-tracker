import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';

const routers: Routes = [
  {
    path: '',
    component: TrainingComponent,
    children: [
      {
        path: 'current',
        component: CurrentTrainingComponent
      },
      {
        path: 'new',
        component: NewTrainingComponent
      },
      {
        path: 'past',
        component: PastTrainingComponent
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routers)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }