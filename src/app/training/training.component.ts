import { Component, OnInit } from "@angular/core";
import { IInternalNavigation } from "../shared/interfaces/internal-navigation.interface";
import { ActivatedRoute } from "@angular/router";
import { TrainingService } from "./services/trainings.service";
import { Subscription } from 'rxjs';
import { ITraining } from './interfaces/training.interface';

@Component({
  selector: "app-training",
  templateUrl: "./training.component.html",
  styleUrls: ["./training.component.scss"]
})
export class TrainingComponent implements OnInit {
  public trainingNav: IInternalNavigation[] = [
    {
      path: "new",
      label: "New training"
    },
    {
      path: "past",
      label: "Past training"
    }
  ];
  public isGoingTraining = false;

  private trainingSubscription: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly trainingService: TrainingService
  ) {}

  ngOnInit() {
    this.trainingSubscription = this.trainingService.selectedExercise$
      .subscribe((training: ITraining) => {
        this.isGoingTraining = !!training;
      })
  }

  ngOnDestroy() {
    this.trainingSubscription.unsubscribe();
  }

  public createNewTrainingHandler() {
    /* this.route. */
  }
}
