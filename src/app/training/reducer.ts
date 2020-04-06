import { ITrainingsState } from './interfaces/trainings-state';
import {
  TrainingActions,
  SET_AVAILABLE_TRAININGS,
  SET_FINISHED_TRAININGS,
  START_TRAINING,
  STOP_TRAINING,
} from './actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITraining } from './interfaces/training.interface';

export const initialState: ITrainingsState = {
  avaliableTrainings: null,
  finishedTrainings: null,
  selectedTraining: null,
};

export function reducer(
  state: ITrainingsState = initialState,
  action: TrainingActions
): ITrainingsState {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        avaliableTrainings: action.payload,
      };
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedTrainings: action.payload,
      };
    case START_TRAINING:
      return {
        ...state,
        selectedTraining: {
          ...state.avaliableTrainings.find(
            (training: ITraining) => training.id === action.payload
          ),
        },
      };
    case STOP_TRAINING:
      return {
        ...state,
        selectedTraining: null,
      };
    default:
      return state;
  }
}

export const getTrainingStore = createFeatureSelector('training');

export const getAvaliableTrainings = createSelector(
  getTrainingStore,
  (state: ITrainingsState) => state.avaliableTrainings
);
export const getFinistedTrainings = createSelector(
  getTrainingStore,
  (state: ITrainingsState) => state.finishedTrainings
);
export const getSelectedTraining = createSelector(
  getTrainingStore,
  (state: ITrainingsState) => state.selectedTraining
);
