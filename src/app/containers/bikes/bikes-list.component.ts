import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Select } from 'primeng/select';
import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Bike } from '../../models/interfaces/bike.interface';
import { Store } from '@ngrx/store';
import { selectBikes, selectBikesLoading, selectCity } from './store/bikes.selectors';
import { setCity } from './store/bikes.actions';
import { CitiesEnum, CitiesType } from '../../models/constants/cities.enum';
import { ProgressSpinner } from 'primeng/progressspinner';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { CapitalizePipe } from '../../utils/pipes/capitalize/capitalize.pipe';
import { BikeCardComponent } from './bike-card/bike-card.component';

@Component({
  selector: 'app-bikes-list',
  imports: [Select, NgOptimizedImage, FormsModule, ProgressSpinner, TranslocoPipe, TitleCasePipe, CapitalizePipe, BikeCardComponent],
  templateUrl: './bikes-list.component.html',
  styleUrl: './bikes-list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BikesListComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly cities: CitiesEnum[] = Object.values(CitiesEnum);

  readonly selectedCity: Signal<CitiesType | null> = this.store.selectSignal(selectCity);
  readonly bikes: Signal<Bike[]> = this.store.selectSignal(selectBikes);
  readonly loading: Signal<boolean> = this.store.selectSignal(selectBikesLoading);

  cityChanged(city: CitiesType): void {
    this.store.dispatch(setCity({ city }));
  }

  goToDetails(id: number): void {
    this.router.navigate([`./details/${id}`], { relativeTo: this.route });
  }
}
