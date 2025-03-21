import { createAction, props } from '@ngrx/store';
import { Bike } from '../../../models/interfaces/bike.interface';
import { AvailableCityType } from '../../../models/constants/available-city.enum';

export const setCity = createAction('[Bikes] Set City', props<{ city: AvailableCityType }>());

export const getBikes = createAction('[Bikes] Get Bikes', props<{ city: AvailableCityType }>());
export const getBikesSuccess = createAction('[Bikes] Get Bikes Success', props<{ bikes: Bike[] }>());

export const getBikeDetails = createAction('[Bikes] Get Bike Details', props<{ id: number }>());
export const getBikeDetailsSuccess = createAction('[Bikes] Get Bike Details Success', props<{ selectedBike: Bike }>());
export const cleanBikeDetails = createAction('[Bikes] Clean Details');
