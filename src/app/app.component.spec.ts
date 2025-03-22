import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LocalStorageService } from './utils/services/local-storage.service';
import { RouterModule } from '@angular/router';
import en from '../assets/i18n/en.json';
import nl from '../assets/i18n/nl.json';
import { TranslocoService, TranslocoTestingModule } from '@jsverse/transloco';

describe('AppComponent', () => {
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;
  let translocoService: TranslocoService;

  beforeEach(async () => {
    const localStorageSpy = jasmine.createSpyObj('LocalStorageService', ['get']);

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterModule.forRoot([]),
        TranslocoTestingModule.forRoot({
          langs: { en, nl },
          translocoConfig: {
            availableLangs: ['en', 'nl'],
            defaultLang: 'en',
          },
        }),
      ],
      providers: [{ provide: LocalStorageService, useValue: localStorageSpy }],
    }).compileComponents();

    localStorageServiceSpy = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
    translocoService = TestBed.inject(TranslocoService);
    spyOn(translocoService, 'setActiveLang').and.callThrough();
  });

  it('should set active language if stored language is valid', () => {
    localStorageServiceSpy.get.and.returnValue('en');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(translocoService.setActiveLang).toHaveBeenCalledWith('en');
  });

  it('should not set active language if stored language is invalid', () => {
    localStorageServiceSpy.get.and.returnValue('fr');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(translocoService.setActiveLang).not.toHaveBeenCalled();
  });

  it('should not set active language if no language is stored', () => {
    localStorageServiceSpy.get.and.returnValue(null);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(translocoService.setActiveLang).not.toHaveBeenCalled();
  });
});
