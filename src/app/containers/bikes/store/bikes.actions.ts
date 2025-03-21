import { createAction, props } from '@ngrx/store';
import { Bike } from '../../../models/bike.interface';

export const getBikes = createAction('[Bikes] Get Bikes', props<{ city: string }>());
export const getBikesSuccess = createAction('[Bikes] Get Bikes Success', props<{ bikes: Bike[] }>());

export const getBikeDetails = createAction('[Bikes] Get Bike Details', props<{ id: number }>());
export const getBikeDetailsSuccess = createAction('[Bikes] Get Bike Details Success', props<{ selectedBike: Bike }>());
