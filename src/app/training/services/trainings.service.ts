import { Injectable } from '@angular/core';
import { ITraining } from "../interfaces/training.interface";
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { TrainingStateEnum } from '../enums/training-state.enum';
import { map, takeUntil } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Injectable()
export class TrainingsService {

  public readonly selectedExercise$: Observable<ITraining>;
  public readonly finishedTrainings$: Observable<ITraining[]>;
  public readonly trainingsBS$: BehaviorSubject<ITraining[]> = new BehaviorSubject([]);
  public readonly availableExercisesBS$: BehaviorSubject<ITraining[]> = new BehaviorSubject([]);

  private readonly selectedExerciseBS$: BehaviorSubject<ITraining> = new BehaviorSubject<ITraining>(null);
  private readonly finishedTrainingsBS$: BehaviorSubject<ITraining[]> = new BehaviorSubject<ITraining[]>(null);
  private readonly unsubscribe: Subject<void> = new Subject<void>();

  constructor(private readonly db: AngularFirestore) {
    this.selectedExercise$ = this.selectedExerciseBS$.asObservable();
    this.finishedTrainings$ = this.finishedTrainingsBS$.asObservable();
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
   * Fetch all past trainings
   */
  public fetchTrainings(): void {
    this.db
      .collection('pastTrainings')
      .valueChanges()
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe((res: ITraining[]) => {
        this.finishedTrainingsBS$.next(res);
      })
  }

  /**
   * Cancel current training
   */
  public cancelTraining(): void {
    const cancelledTraining = {...this.selectedExerciseBS$.value};
    cancelledTraining.state = TrainingStateEnum.Cancelled;
    this.updateTrainings(cancelledTraining);
  }

  /**
   * Complete current training
   */
  public completeTraining(): void {
    const completedTraining = {...this.selectedExerciseBS$.value};
    completedTraining.state = TrainingStateEnum.Completed;
    this.updateTrainings(completedTraining);
  }

  /**
   * Handler of select exercise
   * @param exercise – selected exercise
   */
  public selectExercise(exercise: ITraining) {
    this.selectedExerciseBS$.next(exercise);
  }

  /**
   * Return selected exercise
   */
  public getSelectExercise(): ITraining {
    return this.selectedExerciseBS$.value;
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
