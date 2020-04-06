import { Component } from '@angular/core';
import { IInternalNavigation } from '../shared/interfaces/internal-navigation.interface';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent {
  public trainingNav: IInternalNavigation[] = [
    {
      path: 'new',
      label: 'New training',
    },
    {
      path: 'past',
      label: 'Past training',
    },
  ];

  constructor() {}
}
