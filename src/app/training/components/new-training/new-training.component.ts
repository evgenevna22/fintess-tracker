import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingsService } from '../../services/trainings.service';
import { ITraining } from '../../interfaces/training.interface';
import { FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  public trainings: ITraining[];
  public selectedTraining: FormControl = new FormControl(null, Validators.required);

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly trainingsService: TrainingsService,
  ) {}

  ngOnInit() {
    this.trainingsService.fetchAvailableExercises();

    this.trainingsService.availableExercisesBS$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res: ITraining[]) => this.trainings = res );

    this.selectedTraining.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((id: string) => {
        this.trainingsService.selectExercise(this.trainings.find(training => training.id === id));
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
    this.router.navigate(['../current'], {relativeTo: this.activatedRoute});
  }
}
