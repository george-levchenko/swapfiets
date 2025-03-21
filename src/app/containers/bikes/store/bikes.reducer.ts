import { Bike } from '../../../models/interfaces/bike.interface';
import { createReducer, on } from '@ngrx/store';
import * as BikesActions from './bikes.actions';
import { AvailableCityType } from '../../../models/constants/available-city.enum';

export interface BikesState {
  city: AvailableCityType | null;
  bikes: Bike[];
  selectedBike: Bike | null;
  loading: boolean;
}

const initialState: BikesState = {
  city: null,
  bikes: [],
  selectedBike: null,
  loading: false,
};

export const bikesReducer = createReducer(
  initialState,
  on(
    BikesActions.setCity,
    (state: BikesState, { city }): BikesState => ({
      ...state,
      city,
    })
  ),
  on(
    BikesActions.getBikes,
    (state: BikesState): BikesState => ({
      ...state,
      loading: true,
    })
  ),
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
  ),
  on(BikesActions.cleanBikeDetails, (state: BikesState): BikesState => ({ ...state, selectedBike: null }))
);
