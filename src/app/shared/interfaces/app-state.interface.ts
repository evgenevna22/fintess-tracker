import { IUIState } from './ui-state.interface';
import { IAuthState } from './auth-state.interface';

export interface IAppState {
  ui: IUIState,
  auth: IAuthState
}