import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BikeDetailsComponent } from './bike-details.component';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TitleCasePipe } from '@angular/common';
import { getBikeDetails, cleanBikeDetails } from '../store/bikes.actions';
import { selectBikesLoading, selectSelectedBike } from '../store/bikes.selectors';
import { Bike } from '../../../models/interfaces/bike.interface';
import { Subject } from 'rxjs';
import { TranslocoService, TranslocoTestingModule } from '@jsverse/transloco';

describe('BikeDetailsComponent', () => {
  let component: BikeDetailsComponent;
  let fixture: ComponentFixture<BikeDetailsComponent>;
  let store: jasmine.SpyObj<Store>;
  let activatedRoute: ActivatedRoute;
  let translocoService: TranslocoService;
  let langChangesSubject: Subject<string>;

  const fakeBike: Bike = {
    id: 1,
    thumb: '/bike.png',
    large_img: '/bike-large.png',
    title: 'Test Bike',
    stolen_location: 'Amsterdam',
    manufacturer_name: 'BikeCo',
    frame_model: 'Model X',
    frame_colors: ['red', 'blue'],
  };

  beforeEach(async () => {
    // Create a spy for Store with selectSignal and dispatch methods.
    const storeSpy = jasmine.createSpyObj('Store', ['selectSignal', 'dispatch']);
    storeSpy.selectSignal.and.callFake((selector: unknown) => {
      if (selector === selectSelectedBike) {
        return () => fakeBike;
      } else if (selector === selectBikesLoading) {
        return () => false;
      }
      return () => null;
    });

    activatedRoute = { snapshot: { params: { id: 42 } } } as unknown as ActivatedRoute;

    await TestBed.configureTestingModule({
      imports: [
        BikeDetailsComponent,
        TranslocoTestingModule.forRoot({
          langs: {
            en: {
              'bikes.home': 'Home',
              'bikes.bikes-list': 'Bikes List',
              'bikes.bike-details': 'Bike Details',
            },
            nl: {},
          },
          translocoConfig: {
            availableLangs: ['en', 'nl'],
            defaultLang: 'en',
            reRenderOnLangChange: true,
          },
        }),
      ],
      providers: [{ provide: Store, useValue: storeSpy }, { provide: ActivatedRoute, useValue: activatedRoute }, TitleCasePipe],
    }).compileComponents();

    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    translocoService = TestBed.inject(TranslocoService);
    langChangesSubject = new Subject<string>();

    // Override langChanges$ using Object.defineProperty
    Object.defineProperty(translocoService, 'langChanges$', {
      value: langChangesSubject.asObservable(),
      configurable: true,
      writable: true,
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should dispatch getBikeDetails on init and set breadcrumb items', () => {
    // Override translate so that getBreadcrumbItems returns the expected labels.
    spyOn(translocoService, 'translate').and.callFake(<T = string>(key: string): T => {
      let result: string;
      switch (key) {
        case 'bikes.home':
          result = 'Home';
          break;
        case 'bikes.bikes-list':
          result = 'Bikes List';
          break;
        case 'bikes.bike-details':
          result = 'Bike Details';
          break;
        default:
          result = key;
          break;
      }
      return result as unknown as T;
    });

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(getBikeDetails({ id: 42 }));

    const expectedBreadcrumbItems = [
      { label: 'Home', routerLink: ['/'] },
      { label: 'Bikes List', routerLink: ['/bikes'] },
      { label: 'Bike Details' },
    ];
    expect(component.breadcrumbItems()).toEqual(expectedBreadcrumbItems);
  });

  it('should update breadcrumb items on language change', fakeAsync(() => {
    component.ngOnInit();

    // Override translate to simulate a language change.
    spyOn(translocoService, 'translate').and.callFake(<T = string>(key: string): T => {
      let result: string;
      switch (key) {
        case 'bikes.home':
          result = 'Thuis';
          break;
        case 'bikes.bikes-list':
          result = 'Fietsen Lijst';
          break;
        case 'bikes.bike-details':
          result = 'Fiets Details';
          break;
        default:
          result = key;
          break;
      }
      return result as unknown as T;
    });

    langChangesSubject.next('nl');
    tick(100);

    const expectedBreadcrumbItems = [
      { label: 'Thuis', routerLink: ['/'] },
      { label: 'Fietsen Lijst', routerLink: ['/bikes'] },
      { label: 'Fiets Details' },
    ];
    expect(component.breadcrumbItems()).toEqual(expectedBreadcrumbItems);
  }));

  it('should dispatch cleanBikeDetails on destroy', () => {
    component.ngOnDestroy();
    expect(store.dispatch).toHaveBeenCalledWith(cleanBikeDetails());
  });
});
