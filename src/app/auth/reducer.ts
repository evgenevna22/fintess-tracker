import { AuthActions, SET_AUTHETICATED, SET_UNAUTHETICATED } from './actions'
import { IAuthState } from '../shared/interfaces/auth-state.interface'

const initialState: IAuthState = {
  isAuth: false
}

export function AuthReducer(state: IAuthState = initialState, action: AuthActions): IAuthState {
  switch (action.type) {
    case SET_AUTHETICATED:
      return {
        isAuth: true,
      };
    case SET_UNAUTHETICATED:
      return {
        isAuth: false,
      };
    default:
      return state;
  }
}

export const getIsAuth = (state: IAuthState) => state.isAuth;