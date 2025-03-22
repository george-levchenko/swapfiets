import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { TitleCasePipe } from '@angular/common';
import { CapitalizePipe } from '../../utils/pipes/capitalize/capitalize.pipe';

@Component({
  selector: 'app-dashboard',
  imports: [Button, TranslocoPipe, TitleCasePipe, CapitalizePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit {
  private readonly router = inject(Router);

  private readonly video = viewChild<ElementRef<HTMLVideoElement>>('video');

  goToBikes(): void {
    this.router.navigate(['/bikes']);
  }

  ngAfterViewInit() {
    this.video()!
      .nativeElement.play()
      .catch(() => {
        // console.warn('Autoplay was prevented:', error);
        // Known issue: on the first landing without user interactions video wouldn't be played
        // https://developer.chrome.com/blog/autoplay/
      });
  }
}
