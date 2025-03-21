import { bikesReducer, BikesState } from './containers/bikes/store/bikes.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { BikesEffects } from './containers/bikes/store/bikes.effects';

export interface State {
  bikes: BikesState;
}

export const reducers: ActionReducerMap<State> = {
  bikes: bikesReducer,
};

export const effects = [BikesEffects];
