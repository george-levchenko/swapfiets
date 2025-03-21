import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BikesState } from './bikes.reducer';

export const selectBikesState = createFeatureSelector<BikesState>('bikes');

export const selectBikes = createSelector(selectBikesState, (state: BikesState) => state.bikes);
export const selectSelectedBike = createSelector(selectBikesState, (state: BikesState) => state.selectedBike);
export const selectBikesLoading = createSelector(selectBikesState, (state: BikesState) => state.loading);
