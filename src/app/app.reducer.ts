import * as fromUI from './shared/ui/reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from './shared/interfaces/app-state.interface';

export interface IState {
  ui: IAppState
}

export const reducer: ActionReducerMap<IState> = {
  ui: fromUI.UIReducer
}

export const getUIState = createFeatureSelector<IAppState>('ui');
export const getIsLoading = createSelector(getUIState, fromUI.getIsLoading);