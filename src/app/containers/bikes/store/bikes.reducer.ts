import { Bike } from '../../../models/bike.interface';
import { createReducer, on } from '@ngrx/store';
import * as BikesActions from './bikes.actions';

export interface BikesState {
  bikes: Bike[];
  selectedBike: Bike | null;
  loading: boolean;
}

const initialState: BikesState = {
  bikes: [],
  selectedBike: null,
  loading: false,
};

export const bikesReducer = createReducer(
  initialState,
  on(BikesActions.getBikes, (state: BikesState): BikesState => ({ ...state, loading: true })),
  on(
    BikesActions.getBikesSuccess,
    (state: BikesState, { bikes }): BikesState => ({
      ...state,
      bikes,
      loading: false,
    })
  ),
  on(BikesActions.getBikeDetails, (state: BikesState): BikesState => ({ ...state, loading: true })),
  on(
    BikesActions.getBikeDetailsSuccess,
    (state: BikesState, { selectedBike }): BikesState => ({
      ...state,
      selectedBike,
      loading: false,
    })
  )
);
