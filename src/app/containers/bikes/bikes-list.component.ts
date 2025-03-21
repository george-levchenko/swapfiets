import { Component, inject, Signal } from '@angular/core';
import { Card } from 'primeng/card';
import { Select } from 'primeng/select';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Bike } from '../../models/interfaces/bike.interface';
import { Store } from '@ngrx/store';
import { selectBikes, selectBikesLoading, selectCity } from './store/bikes.selectors';
import { setCity } from './store/bikes.actions';
import { AvailableCity, AvailableCityType } from '../../models/constants/available-city.enum';
import { EllipsisPipe } from '../../utils/pipes/ellipsis.pipe';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Tooltip } from 'primeng/tooltip';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bikes-list',
  imports: [Card, Select, NgOptimizedImage, FormsModule, EllipsisPipe, ProgressSpinner, Tooltip],
  templateUrl: './bikes-list.component.html',
  styleUrl: './bikes-list.component.less',
})
export class BikesListComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly cities: AvailableCity[] = Object.values(AvailableCity);

  protected readonly selectedCity: Signal<AvailableCityType | null> = this.store.selectSignal(selectCity);
  protected readonly bikes: Signal<Bike[]> = this.store.selectSignal(selectBikes);
  protected readonly loading: Signal<boolean> = this.store.selectSignal(selectBikesLoading);

  cityChanged(city: AvailableCityType): void {
    this.store.dispatch(setCity({ city }));
  }

  goToDetails(id: number): void {
    this.router.navigate([`./details/${id}`], { relativeTo: this.route });
  }
}
