import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { MessageService } from 'primeng/api';
import * as BikesActions from './bikes.actions';
import { Bike } from '../../../models/interfaces/bike.interface';
import { BikesService } from '../../../utils/services-api/bikes.service';

@Injectable()
export class BikesEffects {
  private readonly actions$ = inject(Actions);
  private readonly bikesService = inject(BikesService);
  private readonly messageService = inject(MessageService);

  setCity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BikesActions.setCity),
      map(({ city }) => BikesActions.getBikes({ city }))
    );
  });

  getBikes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BikesActions.getBikes),
      exhaustMap(({ city }) =>
        this.bikesService.getBikesByCity(city).pipe(
          map((bikes: { bikes: Bike[] }) => BikesActions.getBikesSuccess({ bikes: bikes.bikes })),
          catchError(error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Load Bikes Failed',
              detail: error.error?.message || error.message,
            });
            return of(error);
          })
        )
      )
    );
  });

  getBikeDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BikesActions.getBikeDetails),
      exhaustMap(({ id }) =>
        this.bikesService.getBikeDetails(id).pipe(
          map((bike: { bike: Bike }) => BikesActions.getBikeDetailsSuccess({ selectedBike: bike.bike })),
          catchError(error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Get Bike Details Failed',
              detail: error.error?.message || error.message,
            });
            return of(error);
          })
        )
      )
    );
  });
}
