import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import 'firebase/firestore';

import { TrainingStateEnum } from '../enums/training-state.enum';
import { ITraining } from '../interfaces/training.interface';
import { UIService } from 'src/app/shared/services/ui-helper.service';
import { IFullTrainingState } from 'src/app/shared/interfaces/training-state.interface';
import * as fromUI from '../../shared/ui/actions';
import * as fromTrainings from '../actions';

@Injectable()
export class TrainingsService {
  public readonly selectedExercise$: Observable<ITraining>;

  private readonly selectedExerciseBS$: BehaviorSubject<ITraining> = new BehaviorSubject<ITraining>(null);

  private readonly unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private readonly db: AngularFirestore,
    private readonly uiService: UIService,
    private readonly store: Store<IFullTrainingState>
  ) {
    this.selectedExercise$ = this.selectedExerciseBS$.asObservable();
  }

  // todo: to do unsubscription
  /**
   * Cancell all subscriptions
   */
  public cancelSubscriptions(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /**
   * Fetch avaliable training from database
   */
  public fetchAvailableExercises(): void {
    this.store.dispatch(new fromUI.StartLoading());
    this.db
      .collection('avaliableExercises')
      .snapshotChanges()
      .pipe(
        map((data: any) => {
          return data.map((item: any) => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data(),
            };
          });
        }),
        takeUntil(this.unsubscribe)
      )
      .subscribe(
        (res: ITraining[]) => {
          this.store.dispatch(new fromUI.StopLoading());
          this.store.dispatch(new fromTrainings.SetAvailableTrainings(res));
        },
        (error: Error) => {
          this.store.dispatch(new fromUI.StopLoading());
          this.uiService.openSnackBar(error.message);
        }
      );
  }

  /**
   * Fetch all past trainings
   */
  public fetchFinishedTrainings(): void {
    this.db
      .collection('pastTrainings')
      .valueChanges()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res: ITraining[]) => {
        this.store.dispatch(new fromTrainings.SetFinishedTrainings(res));
      });
  }

  /**
   * Cancel current training
   */
  public cancelTraining(): void {
    const cancelledTraining = { ...this.selectedExerciseBS$.value };
    cancelledTraining.state = TrainingStateEnum.Cancelled;
    this.db.collection('pastTrainings').add(cancelledTraining);
    this.store.dispatch(new fromTrainings.StopTraining());
  }

  /**
   * Complete current training
   */
  public completeTraining(): void {
    const completedTraining = { ...this.selectedExerciseBS$.value };
    completedTraining.state = TrainingStateEnum.Completed;
    this.db.collection('pastTrainings').add(completedTraining);
    this.store.dispatch(new fromTrainings.StopTraining());
  }

  /**
   * Handler of select exercise
   * @param exercise – selected exercise
   */
  public selectExercise(exercise: ITraining) {
    this.store.dispatch(new fromTrainings.StartTraining(exercise));
  }
}
