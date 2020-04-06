import { ITraining } from './training.interface';

export interface ITrainingsState {
  avaliableTrainings: ITraining[];
  finishedTrainings: ITraining[];
  selectedTraining: ITraining;
}