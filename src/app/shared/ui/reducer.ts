import { IAppState } from '../interfaces/app-state.interface';
import { UIActions, START_LOADING, STOP_LOADING } from './actions';

const initialState: IAppState = {
  isLoading: false,
};

export function UIReducer(state = initialState, action: UIActions): IAppState {
  switch (action.type) {
    case START_LOADING:
      return {
        isLoading: true,
      };
    case STOP_LOADING:
      return {
        isLoading: false,
      };
    default:
      state;
  }
}

export const getIsLoading = (state: IAppState) => state.isLoading;
