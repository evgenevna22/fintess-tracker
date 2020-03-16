import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TrainingTypeEnum } from "../../enums/training-type.enum";
import { TrainingService } from '../../services/trainings.service';
import { ITraining } from '../../interfaces/training.interface';
import { FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.scss"]
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  @Output() createNewTrainingEvent: EventEmitter<void> = new EventEmitter<
    void
  >();

  public trainings: ITraining[] = [];
  public selectedTraining: FormControl = new FormControl(null, Validators.required);

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly trainingService: TrainingService
  ) {}

  ngOnInit() {
    this.trainings = this.trainingService.getAvailableTrainings();

    this.selectedTraining.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((training: ITraining) => {
        this.trainingService.selectedExercise$.next(training);
      })
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /**
   * Creating the new training
   */
  public createNewTraining(): void {
    this.router.navigate(["/current"]);
  }
}
