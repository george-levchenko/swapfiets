import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Card } from 'primeng/card';
import { NgOptimizedImage } from '@angular/common';
import { Tooltip } from 'primeng/tooltip';
import { Bike } from '../../../models/interfaces/bike.interface';
import { EllipsisPipe } from '../../../utils/pipes/ellipsis/ellipsis.pipe';

@Component({
  selector: 'app-bike-card',
  imports: [Card, NgOptimizedImage, Tooltip, EllipsisPipe],
  templateUrl: './bike-card.component.html',
  styleUrl: './bike-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BikeCardComponent {
  readonly bike = input.required<Bike>();
  readonly bikeClicked = output<number>();
}
