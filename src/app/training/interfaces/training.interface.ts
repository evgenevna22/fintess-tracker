import { TrainingTypeEnum } from '../enums/training-type.enum';
import { TrainingStateEnum } from '../enums/training-state.enum';

export interface ITraining {
  id: string;
  type: TrainingTypeEnum;
  name: string;
  duration: number;
  calories: number;
  date?: string;
  state?: TrainingStateEnum;
}