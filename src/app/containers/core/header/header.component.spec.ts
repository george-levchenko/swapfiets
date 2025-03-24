import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { LocalStorageService } from '../../../utils/services/local-storage.service';
import { Popover } from 'primeng/popover';
import { TranslocoService } from '@jsverse/transloco';
import { getTranslocoModule } from '../../../../tests/unit/transloco-testing.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let translocoService: TranslocoService;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  let popoverMock: Popover;

  beforeEach(async () => {
    localStorageService = jasmine.createSpyObj('LocalStorageService', ['set']);
    popoverMock = { hide: jasmine.createSpy('hide') } as unknown as Popover;

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterModule.forRoot([]), getTranslocoModule()],
      providers: [{ provide: LocalStorageService, useValue: localStorageService }],
    }).compileComponents();

    translocoService = TestBed.inject(TranslocoService);
    spyOn(translocoService, 'getActiveLang').and.returnValue('en');
    spyOn(translocoService, 'setActiveLang').and.stub();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    // Override the readonly popover so that calling component.popover() returns our popoverMock.
    Object.defineProperty(component, 'popover', {
      value: () => popoverMock,
    });

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedLanguage on init', () => {
    component.ngOnInit();
    expect(component.selectedLanguage()).toBe('en');
    expect(translocoService.getActiveLang).toHaveBeenCalled();
  });

  it('should change language, update services, and hide popover after 300ms', fakeAsync(() => {
    component.changeLanguage('nl');

    expect(component.selectedLanguage()).toBe('nl');
    expect(translocoService.setActiveLang).toHaveBeenCalledWith('nl');
    expect(localStorageService.set).toHaveBeenCalledWith('language', 'nl');
    expect(popoverMock.hide).not.toHaveBeenCalled();

    tick(300);
    expect(popoverMock.hide).toHaveBeenCalled();
  }));
});
