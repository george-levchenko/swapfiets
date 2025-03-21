import { Component, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { Card } from 'primeng/card';
import { Store } from '@ngrx/store';
import { Bike } from '../../../models/interfaces/bike.interface';
import { selectBikesLoading, selectSelectedBike } from '../store/bikes.selectors';
import { NgOptimizedImage } from '@angular/common';
import { cleanBikeDetails, getBikeDetails } from '../store/bikes.actions';
import { ActivatedRoute } from '@angular/router';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-bike-details',
  imports: [Breadcrumb, Card, NgOptimizedImage, Skeleton],
  templateUrl: './bike-details.component.html',
  styleUrl: './bike-details.component.less',
})
export class BikeDetailsComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);

  protected readonly breadcrumbItems = [
    { label: 'Home', routerLink: ['/'] },
    { label: 'Bikes List', routerLink: ['/bikes'] },
    { label: 'Bike Details' },
  ];

  protected readonly selectedBike: Signal<Bike | null> = this.store.selectSignal(selectSelectedBike);
  protected readonly loading: Signal<boolean> = this.store.selectSignal(selectBikesLoading);

  ngOnInit(): void {
    this.store.dispatch(getBikeDetails({ id: this.route.snapshot.params['id'] }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(cleanBikeDetails());
  }
}
