import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { Card } from 'primeng/card';
import { Store } from '@ngrx/store';
import { Bike } from '../../../models/interfaces/bike.interface';
import { selectBikesLoading, selectSelectedBike } from '../store/bikes.selectors';
import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { cleanBikeDetails, getBikeDetails } from '../store/bikes.actions';
import { ActivatedRoute } from '@angular/router';
import { Skeleton } from 'primeng/skeleton';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { delay } from 'rxjs';

@Component({
  selector: 'app-bike-details',
  imports: [Breadcrumb, Card, NgOptimizedImage, Skeleton, TranslocoPipe, TitleCasePipe],
  templateUrl: './bike-details.component.html',
  styleUrl: './bike-details.component.less',
  providers: [TitleCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class BikeDetailsComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly translocoService = inject(TranslocoService);
  private readonly titleCasePipe = inject(TitleCasePipe);

  breadcrumbItems: WritableSignal<{ label: string; routerLink?: string[] }[]> = signal([]);

  readonly selectedBike: Signal<Bike | null> = this.store.selectSignal(selectSelectedBike);
  readonly loading: Signal<boolean> = this.store.selectSignal(selectBikesLoading);

  ngOnInit(): void {
    this.store.dispatch(getBikeDetails({ id: this.route.snapshot.params['id'] }));
    this.breadcrumbItems.set(this.getBreadcrumbItems());

    this.translocoService.langChanges$.pipe(untilDestroyed(this), delay(100)).subscribe(() => {
      // delay need because translation file have to be uploaded and applied first
      this.breadcrumbItems.set(this.getBreadcrumbItems());
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(cleanBikeDetails());
  }

  private getBreadcrumbItems() {
    return [
      { label: this.titleCasePipe.transform(this.translocoService.translate('bikes.home')), routerLink: ['/'] },
      { label: this.titleCasePipe.transform(this.translocoService.translate('bikes.bikes-list')), routerLink: ['/bikes'] },
      { label: this.titleCasePipe.transform(this.translocoService.translate('bikes.bike-details')) },
    ];
  }
}
