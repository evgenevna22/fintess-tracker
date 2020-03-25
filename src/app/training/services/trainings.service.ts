import { OnDestroy } from '@angular/core';
import { ITraining } from "../interfaces/training.interface";
import { BehaviorSubject, Subject } from 'rxjs';
import { TrainingStateEnum } from '../enums/training-state.enum';
import { map, takeUntil } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

export class TrainingsService implements OnDestroy {

  public selectedExercise$: BehaviorSubject<ITraining> = new BehaviorSubject<ITraining>(null);
  public trainingsBS$: BehaviorSubject<ITraining[]> = new BehaviorSubject([]);
  public availableExercisesBS$: BehaviorSubject<ITraining[]> = new BehaviorSubject([]);

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(private readonly db: AngularFirestore) { }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /**
   * Fetch avaliable training from database
   */
  public fetchAvailableExercises(): void {
    this.db.collection('avaliableExercises')
      .snapshotChanges()
      .pipe(
        map(data => {
          return data.map((item: any) => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            }
          })
        }),
        takeUntil(this.unsubscribe)
      )
      .subscribe((res: ITraining[]) => {
        this.availableExercisesBS$.next(res);
      })
  }

  /**
   * Cancel current training
   */
  public cancelTraining(): void {
    const cancelledTraining = {...this.selectedExercise$.value};
    cancelledTraining.state = TrainingStateEnum.Cancelled;
    this.updateTrainings(cancelledTraining);
  }

  /**
   * Complete current training
   */
  public completeTraining(): void {
    const completedTraining = {...this.selectedExercise$.value};
    completedTraining.state = TrainingStateEnum.Completed;
    this.updateTrainings(completedTraining);
  }

  /**
   * Update trainings models and post training to database
   * @param training – training model
   */
  private updateTrainings(training: ITraining): void {
    const updatedValue = [...this.trainingsBS$.value, training];
    this.trainingsBS$.next(updatedValue);
    this.db.collection('pastTrainings').add(training);
  }
}
