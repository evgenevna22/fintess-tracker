import { ITraining } from "../interfaces/training.interface";
import { Subject } from 'rxjs';

export class TrainingService {
  
  public selectedExercise$: Subject<ITraining> = new Subject<ITraining>();
  private availableTrainings: ITraining[] = [
    { 
      type: 0,
      name: "Crunches",
      duration: 30,
      calories: 8
    },
    {
      type: 1,
      name: "Touch Toes",
      duration: 180,
      calories: 15
    },
    {
      type: 2,
      name: "Side Lunges",
      duration: 120,
      calories: 18
    },
    { 
      type: 3,
      name: "Burpees",
      duration: 60,
      calories: 8 
    }
  ];

  public getAvailableTrainings(): ITraining[] {
    return Object.assign(this.availableTrainings);
  }
}
