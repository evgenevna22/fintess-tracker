import { Action } from '@ngrx/store';

export const SET_AUTHETICATED = '[Auth] Set Autheticated';
export const SET_UNAUTHETICATED = '[Auth] Set Unautheticated';

export class SetAutheticated implements Action {
  public readonly type: string = SET_AUTHETICATED;
}

export class SetUnautheticated implements Action {
  public readonly type: string = SET_UNAUTHETICATED;
}

export type AuthActions = SetAutheticated | SetUnautheticated;