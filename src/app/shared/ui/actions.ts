import { Action } from '@ngrx/store';

export const START_LOADING = '[ui] Start loading';
export const STOP_LOADING = '[ui] Stop loading';

export class StartLoading implements Action {
  readonly type: string = START_LOADING;
}

export class StopLoading implements Action {
  readonly type: string = STOP_LOADING;
}

export type UIActions = StartLoading | StopLoading;