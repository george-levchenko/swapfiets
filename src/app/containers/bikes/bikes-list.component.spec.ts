import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BikesListComponent } from './bikes-list.component';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { selectCity, selectBikes, selectBikesLoading } from './store/bikes.selectors';
import { setCity } from './store/bikes.actions';
import { CitiesEnum } from '../../models/constants/cities.enum';
import { Bike } from '../../models/interfaces/bike.interface';
import { TranslocoTestingModule } from '@jsverse/transloco';

describe('BikesListComponent', () => {
  let component: BikesListComponent;
  let fixture: ComponentFixture<BikesListComponent>;
  let store: jasmine.SpyObj<Store>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['selectSignal', 'dispatch']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Stub the selectSignal calls to return fake signals.
    storeSpy.selectSignal.and.callFake((selector: unknown) => {
      if (selector === selectCity) {
        return () => CitiesEnum.AMSTERDAM;
      } else if (selector === selectBikes) {
        const fakeBike: Bike = {
          id: 1,
          thumb: '/bike1.png',
          large_img: '/bike1-large.png',
          title: 'Bike 1',
          stolen_location: 'Amsterdam Center',
          manufacturer_name: 'BikeCo',
          frame_model: 'Model X',
          frame_colors: ['red', 'blue'],
        };
        return () => [fakeBike];
      } else if (selector === selectBikesLoading) {
        return () => false;
      }
      return () => null;
    });

    activatedRoute = { snapshot: {} } as ActivatedRoute;

    await TestBed.configureTestingModule({
      imports: [
        BikesListComponent,
        TranslocoTestingModule.forRoot({
          langs: { en: {}, nl: {} },
          translocoConfig: {
            availableLangs: ['en', 'nl'],
            defaultLang: 'en',
          },
        }),
      ],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRoute },
      ],
    }).compileComponents();

    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component and have default signals', () => {
    expect(component).toBeTruthy();
    expect(component.selectedCity()).toBe(CitiesEnum.AMSTERDAM);

    const expectedBike: Bike = {
      id: 1,
      thumb: '/bike1.png',
      large_img: '/bike1-large.png',
      title: 'Bike 1',
      stolen_location: 'Amsterdam Center',
      manufacturer_name: 'BikeCo',
      frame_model: 'Model X',
      frame_colors: ['red', 'blue'],
    };
    expect(component.bikes()).toEqual([expectedBike]);
    expect(component.loading()).toBe(false);
  });

  it('should have cities equal to Object.values(CitiesEnum)', () => {
    expect(component.cities).toEqual(Object.values(CitiesEnum));
  });

  it('should dispatch setCity action when cityChanged is called', () => {
    const city = CitiesEnum.ROTTERDAM;
    component.cityChanged(city);
    expect(store.dispatch).toHaveBeenCalledWith(setCity({ city }));
  });

  it('should navigate to bike details when goToDetails is called', () => {
    const id = 1;
    component.goToDetails(id);
    expect(router.navigate).toHaveBeenCalledWith([`./details/${id}`], { relativeTo: activatedRoute });
  });
});
