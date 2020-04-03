import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './components/current-training/current-training.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { PastTrainingComponent } from './components/past-training/past-training.component';
import { PageCurrentTrainingGuard } from './guards/page-current-training.guard';

const routers: Routes = [
  {
    path: '',
    component: TrainingComponent,
    children: [
      {
        path: 'new',
        component: NewTrainingComponent
      },
      {
        path: 'past',
        component: PastTrainingComponent
      },
      {
        path: 'current',
        component: CurrentTrainingComponent,
        canLoad: [PageCurrentTrainingGuard]
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routers)],
  exports: [RouterModule],
  providers: [PageCurrentTrainingGuard]
})
export class TrainingRoutingModule { }