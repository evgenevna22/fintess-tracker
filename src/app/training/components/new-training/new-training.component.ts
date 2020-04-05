import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingsService } from '../../services/trainings.service';
import { ITraining } from '../../interfaces/training.interface';
import { FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { ComponentPortal } from '@angular/cdk/portal';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { SpinnerService } from 'src/app/shared/components/spinner/spiner.service';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/shared/interfaces/app-state.interface';
import * as fromRoot from '../../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  public trainings: ITraining[];
  public selectedTraining: FormControl = new FormControl(null, Validators.required);
  public portalSpinner: ComponentPortal<SpinnerComponent>;

  public isLoading$: Observable<boolean>;

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly trainingsService: TrainingsService,
    private readonly spinnerService: SpinnerService,
    private readonly store: Store<IAppState>
  ) {}

  ngOnInit() {
    this.portalSpinner = this.spinnerService.createComponentPortal();

    this.isLoading$ = this.store.pipe(select(fromRoot.getIsLoading));

    this.trainingsService.availableExercisesBS$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res: ITraining[]) => (this.trainings = res));

    this.selectedTraining.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe((id: string) => {
      this.trainingsService.selectExercise(this.trainings.find((training) => training.id === id));
    });

    this.fetchAvaliableExs();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /**
   * Creating the new training
   */
  public createNewTraining(): void {
    this.router.navigate(['../current'], { relativeTo: this.activatedRoute });
  }

  /**
   * Fetch avaliable exercises for choosing
   */
  public fetchAvaliableExs(): void {
    this.trainingsService.fetchAvailableExercises();
  }
}
