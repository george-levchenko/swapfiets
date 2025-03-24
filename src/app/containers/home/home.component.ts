import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { TitleCasePipe } from '@angular/common';
import { CapitalizePipe } from '../../utils/pipes/capitalize/capitalize.pipe';
import { catchError, EMPTY, from, fromEvent, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [Button, TranslocoPipe, TitleCasePipe, CapitalizePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit {
  private readonly router = inject(Router);

  readonly isVideoPlaying = signal<boolean>(false);
  private readonly video = viewChild<ElementRef<HTMLVideoElement>>('video');

  goToBikes(): void {
    this.router.navigate(['/bikes']);
  }

  playVideo(): void {
    from(this.video()!.nativeElement.play())
      .pipe(
        tap(() => this.isVideoPlaying.set(true)),
        catchError(error => {
          console.error('Manual play prevented:', error);
          return EMPTY;
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    // Attempt autoplay on landing.
    from(this.video()!.nativeElement.play())
      .pipe(
        tap(() => this.isVideoPlaying.set(true)),
        catchError(error => {
          console.warn('Autoplay was prevented:', error);
          // Known issue: on the first landing without user interactions video wouldn't be played
          // https://developer.chrome.com/blog/autoplay/
          return EMPTY;
        })
      )
      .subscribe();

    // Listen for the 'play'
    fromEvent(this.video()!.nativeElement, 'play')
      .pipe(tap(() => this.isVideoPlaying.set(true)))
      .subscribe();
  }
}
