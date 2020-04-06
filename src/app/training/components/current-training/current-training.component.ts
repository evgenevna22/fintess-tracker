import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SimpleDialogComponent } from 'src/app/shared/components/simple-dialog/simple-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { TrainingsService } from '../../services/trainings.service';
import { ITraining } from '../../interfaces/training.interface';
import { Store, select } from '@ngrx/store';
import { IFullTrainingState } from 'src/app/shared/interfaces/training-state.interface';
import * as fromTrainings from '../../reducer';

const finishedSpinnerValue = 100;

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit {
  public trainingProgress = 0;
  public training: ITraining;
  private timer: number;
  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly trainingsService: TrainingsService,
    private readonly store: Store<IFullTrainingState>
  ) {}

  ngOnInit() {
    this.store
      .pipe(select(fromTrainings.getSelectedTraining), take(1))
      .subscribe((training: ITraining) => {
        this.training = training;
        this.startOrResumeTimer();
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /**
   * Stop training handler
   */
  public stopTraining(): void {
    clearInterval(this.timer);
    const disalogRef: MatDialogRef<
      SimpleDialogComponent,
      any
    > = this.dialog.open(SimpleDialogComponent, {
      data: {
        title: 'Are you sure you want to finish your training?',
        info: `Your progress is ${this.trainingProgress} %`,
      },
    });

    disalogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((result: boolean) => {
        if (result) {
          this.trainingsService.cancelTraining();
          this.router.navigate(['../new'], { relativeTo: this.activatedRoute });
        } else {
          this.startOrResumeTimer();
        }
      });
  }

  /**
   * Method start or resume timer
   */
  private startOrResumeTimer(): void {
    this.timer = <any>setInterval(() => {
      this.trainingProgress < finishedSpinnerValue
        ? (this.trainingProgress += 10)
        : this.compeleteTraining();
    }, 1000);
  }

  /**
   * Method to complete the training
   */
  private compeleteTraining(): void {
    clearInterval(this.timer);
    this.trainingsService.completeTraining();
    this.router.navigate(['../new'], { relativeTo: this.activatedRoute });
  }
}
