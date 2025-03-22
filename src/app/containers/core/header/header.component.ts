import { ChangeDetectionStrategy, Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Popover } from 'primeng/popover';
import { PrimeTemplate } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { languages } from '../../../models/constants/languages.const';
import { RadioButton } from 'primeng/radiobutton';
import { timer } from 'rxjs';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { LocalStorageService } from '../../../utils/services/local-storage.service';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage, RouterLink, RouterLinkActive, Popover, PrimeTemplate, FormsModule, RadioButton, TranslocoPipe, TitleCasePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  private readonly translocoService = inject(TranslocoService);
  private readonly localStorageService = inject(LocalStorageService);

  protected readonly languages = languages;

  readonly selectedLanguage = signal('');
  readonly popover = viewChild<Popover>('popover');

  ngOnInit() {
    this.selectedLanguage.set(this.translocoService.getActiveLang());
  }

  changeLanguage(code: string): void {
    this.selectedLanguage.set(code);
    this.translocoService.setActiveLang(code);
    this.localStorageService.set('language', code);

    timer(300).subscribe(() => {
      this.popover()!.hide();
    });
  }
}
