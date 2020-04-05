import { IUIState } from '../interfaces/ui-state.interface';
import { UIActions, START_LOADING, STOP_LOADING } from './actions';

const initialState: IUIState = {
  isLoading: false,
};

export function UIReducer(state = initialState, action: UIActions): IUIState {
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
      return state;
  }
}

export const getIsLoading = (state: IUIState) => state.isLoading;
