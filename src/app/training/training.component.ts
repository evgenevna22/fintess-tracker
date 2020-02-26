import { Component, OnInit } from '@angular/core';
import { INavigation } from '../shared/interfaces/navigation.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  public trainingNav: INavigation[] = [
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
