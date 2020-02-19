import { Component, OnInit } from '@angular/core';
import { INavigation } from '../shared/interfaces/navigation.interface';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  public trainingNav: INavigation[] = [
    {
      path: 'current',
      label: 'Current training'
    },
    {
      path: 'new',
      label: 'New training'
    },
    {
      path: 'past',
      label: 'Past training'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
