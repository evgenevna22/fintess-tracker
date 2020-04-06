import { IAppState } from './app-state.interface';
import { ITrainingsState } from 'src/app/training/interfaces/trainings-state';

export interface IFullTrainingState extends IAppState {
  trainings: ITrainingsState;
}