import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { map, takeUntil, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store, select } from '@ngrx/store';
import 'firebase/firestore';

import { TrainingStateEnum } from '../enums/training-state.enum';
import { ITraining } from '../interfaces/training.interface';
import { UIService } from 'src/app/shared/services/ui-helper.service';
import { IFullTrainingState } from 'src/app/shared/interfaces/training-state.interface';
import * as UI from '../../shared/ui/actions';
import * as trainings from '../actions';
import * as fromTrainings from '../reducer';

@Injectable()
export class TrainingsService {
  private readonly unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private readonly db: AngularFirestore,
    private readonly uiService: UIService,
    private readonly store: Store<IFullTrainingState>
  ) {
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
    this.store.dispatch(new UI.StartLoading());
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
          this.store.dispatch(new UI.StopLoading());
          this.store.dispatch(new trainings.SetAvailableTrainings(res));
        },
        (error: Error) => {
          this.store.dispatch(new UI.StopLoading());
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
        this.store.dispatch(new trainings.SetFinishedTrainings(res));
      });
  }

  /**
   * Cancel current training
   */
  public cancelTraining(): void {
    this.store
      .pipe(select(fromTrainings.getSelectedTraining), take(1))
      .subscribe((training: ITraining) => {
        training.state = TrainingStateEnum.Cancelled;
        this.db.collection('pastTrainings').add(training);
        this.store.dispatch(new trainings.StopTraining());
      });
  }

  /**
   * Complete current training
   */
  public completeTraining(): void {
    this.store
      .pipe(select(fromTrainings.getSelectedTraining), take(1))
      .subscribe((training: ITraining) => {
        training.state = TrainingStateEnum.Completed;
        this.db.collection('pastTrainings').add(training);
        this.store.dispatch(new trainings.StopTraining());
      });
  }

  /**
   * Handler of selected exercise
   * @param id – selected exercise id
   */
  public selectTraining(id: string) {
    this.store.dispatch(new trainings.StartTraining(id));
  }
}
