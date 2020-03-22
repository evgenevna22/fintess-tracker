import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './components/current-training/current-training.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { PastTrainingComponent } from './components/past-training/past-training.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routers: Routes = [
  {
    path: '',
    component: TrainingComponent,
    children: [
      {
        path: 'new',
        pathMatch: 'full',
        component: NewTrainingComponent
      },
      {
        path: 'past',
        pathMatch: 'full',
        component: PastTrainingComponent
      },
      {
        path: 'current',
        pathMatch: 'full',
        component: CurrentTrainingComponent
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routers)],
  exports: [RouterModule],
})
export class TrainingRoutingModule { }