import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { IUIState } from './shared/interfaces/ui-state.interface';
import { IAppState } from './shared/interfaces/app-state.interface';
import * as fromUI from './shared/ui/reducer';
import * as fromAuth from './auth/reducer';
import { IAuthState } from './shared/interfaces/auth-state.interface';

export const reducers: ActionReducerMap<IAppState> = {
  ui: fromUI.UIReducer,
  auth: fromAuth.AuthReducer,
};

export const getUIState = createFeatureSelector<IUIState>('ui');
export const getIsLoading = createSelector(getUIState, fromUI.getIsLoading);

export const getAuthState = createFeatureSelector<IAuthState>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);
