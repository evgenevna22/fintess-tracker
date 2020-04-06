import { Action } from '@ngrx/store';
import { ITraining } from './interfaces/training.interface';

export const SET_AVAILABLE_TRAININGS = '[Training] Set Available Trainings';
export const SET_FINISHED_TRAININGS = '[Training] Set Finished Trainings';
export const START_TRAINING = '[Training] Start Training';
export const STOP_TRAINING = '[Training] Stop Training';

export class SetAvailableTrainings implements Action {
  public readonly type: string = SET_AVAILABLE_TRAININGS;

  constructor(public payload: ITraining[]) {}
}

export class SetFinishedTrainings implements Action {
  public readonly type: string = SET_FINISHED_TRAININGS;

  constructor(public payload: ITraining[]) {}
}

export class StartTraining implements Action {
  public readonly type: string = START_TRAINING;

  constructor(public payload: string) {}
}

export class StopTraining implements Action {
  public readonly type: string = STOP_TRAINING;

  // todo: remove constructor and resolve console error
  constructor(public payload?: any) {}
}

export type TrainingActions =
  | SetAvailableTrainings
  | SetFinishedTrainings
  | StartTraining
  | StopTraining;
