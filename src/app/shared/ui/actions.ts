import { Action } from '@ngrx/store';

export const START_LOADING = '[UI] Start loading';
export const STOP_LOADING = '[UI] Stop loading';

export class StartLoading implements Action {
  public readonly type: string = START_LOADING;
}

export class StopLoading implements Action {
  public readonly type: string = STOP_LOADING;
}

export type UIActions = StartLoading | StopLoading;
