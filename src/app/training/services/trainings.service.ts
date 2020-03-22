import { ITraining } from "../interfaces/training.interface";
import { BehaviorSubject } from 'rxjs';
import { TrainingStateEnum } from '../enums/training-state.enum';

export class TrainingsService {

  constructor() {
    if (localStorage.getItem('trainings')) {
      this.trainings = JSON.parse(localStorage.getItem('trainings'));
      this.trainingsBS$.next(Object.assign([], this.trainings));
    }
  }
  
  public selectedExercise$: BehaviorSubject<ITraining> = new BehaviorSubject<ITraining>(null);
  public trainingsBS$: BehaviorSubject<ITraining[]> = new BehaviorSubject(null);
  private trainings: ITraining[] = [];
  private availableExercised: ITraining[] = [
    { 
      id: 0,
      type: 0,
      name: "Crunches",
      duration: 30,
      calories: 8,
      date: '2019-06-07T09:27:52Z'
    },
    {
      id: 1,
      type: 1,
      name: "Touch Toes",
      duration: 180,
      calories: 15,
      date: '2019-09-03T02:07:11Z'
    },
    {
      id: 2,
      type: 2,
      name: "Side Lunges",
      duration: 120,
      calories: 18,
      date: '2019-05-21T17:34:55Z'
    },
    { 
      id: 3,
      type: 3,
      name: "Burpees",
      duration: 60,
      calories: 8,
      date: '2019-09-01T13:28:18Z'
    }
  ];

  /**
   * Get avaliable training for filter
   * @return trainings
   */
  public getAvailableExercises(): ITraining[] {
    return Object.assign(this.availableExercised);
  }

  /**
   * Cancel current training
   */
  public cancelTraining(): void {
    const cancelledTraining = {...this.selectedExercise$.value};
    cancelledTraining.state = TrainingStateEnum.Cancelled;
    this.updateTrainings(cancelledTraining);
    localStorage.setItem('trainings', JSON.stringify(this.trainings));
  }

  /**
   * Complete current training
   */
  public completeTraining(): void {
    const completedTraining = {...this.selectedExercise$.value};
    completedTraining.state = TrainingStateEnum.Completed;
    this.updateTrainings(completedTraining);
    localStorage.setItem('trainings', JSON.stringify(this.trainings));
  }

  /**
   * Update trainings models
   * @param training – training
   */
  private updateTrainings(training: ITraining): void {
    this.trainings.push(training);
    this.trainingsBS$.next(Object.assign([], this.trainings));
  }
}
