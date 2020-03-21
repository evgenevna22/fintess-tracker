import { ITraining } from "../interfaces/training.interface";
import { BehaviorSubject } from 'rxjs';
import { TrainingStateEnum } from '../enums/training-state.enum';

export class TrainingService {
  
  public selectedExercise$: BehaviorSubject<ITraining> = new BehaviorSubject<ITraining>(null);
  private availableTrainings: ITraining[] = [
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
  private trainings: ITraining[] = [];

  public getAvailableTrainings(): ITraining[] {
    return Object.assign(this.availableTrainings);
  }

  public cancelTraining(): void {
    const cancelledTraining = {...this.selectedExercise$.value};
    cancelledTraining.state = TrainingStateEnum.Cancelled;
    this.trainings.push(cancelledTraining);
  }

  public completeTraining(): void {
    const cancelledTraining = {...this.selectedExercise$.value};
    cancelledTraining.state = TrainingStateEnum.Completed;
    this.trainings.push(cancelledTraining);
  }
}
