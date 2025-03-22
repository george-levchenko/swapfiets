import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { CapitalizePipe } from '../../../utils/pipes/capitalize/capitalize.pipe';

@Component({
  selector: 'app-footer',
  imports: [NgOptimizedImage, TranslocoPipe, CapitalizePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
