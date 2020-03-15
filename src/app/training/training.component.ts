import { Component, OnInit } from '@angular/core';
import { IInternalNavigation } from '../shared/interfaces/internal-navigation.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  public trainingNav: IInternalNavigation[] = [
    {
      path: 'new',
      label: 'New training'
    },
    {
      path: 'past',
      label: 'Past training'
    },
  ];

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit() {
  }

  public createNewTrainingHandler() {
    /* this.route. */
  }

}
