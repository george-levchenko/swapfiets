import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './containers/core/header/header.component';
import { FooterComponent } from './containers/core/footer/footer.component';
import { LocalStorageService } from './utils/services/local-storage.service';
import { TranslocoService } from '@jsverse/transloco';
import { languages } from './models/constants/languages.const';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly translocoService = inject(TranslocoService);

  ngOnInit() {
    const languageCode = this.localStorageService.get('language');

    if (languages.some(lang => lang.code === languageCode)) {
      this.translocoService.setActiveLang(languageCode!);
    }
  }
}
