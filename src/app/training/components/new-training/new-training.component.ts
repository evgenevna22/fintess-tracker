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
import * as fromRoot from '../../../app.reducer';
import * as fromTraining from '../../reducer';
import { IFullTrainingState } from 'src/app/shared/interfaces/training-state.interface';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  public trainings$: Observable<ITraining[]>;
  public selectedTraining: FormControl = new FormControl(
    null,
    Validators.required
  );
  public portalSpinner: ComponentPortal<SpinnerComponent>;

  public isLoading$: Observable<boolean>;

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly trainingsService: TrainingsService,
    private readonly spinnerService: SpinnerService,
    private readonly store: Store<IFullTrainingState>
  ) {}

  ngOnInit() {
    this.fetchAvaliableExs();

    this.portalSpinner = this.spinnerService.createComponentPortal();

    this.isLoading$ = this.store.pipe(select(fromRoot.getIsLoading));
    this.trainings$ = this.store.pipe(select(fromTraining.getAvaliableTrainings));

    this.selectedTraining.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((id: string) => {
        this.trainingsService.selectTraining(id);
      });
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
