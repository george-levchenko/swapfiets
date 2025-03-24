import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BikesListComponent } from './bikes-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { selectBikes, selectBikesLoading, selectCity } from './store/bikes.selectors';
import { setCity } from './store/bikes.actions';
import { CitiesEnum } from '../../models/constants/cities.enum';
import { getTranslocoModule } from '../../../tests/unit/transloco-testing.module';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('BikesListComponent', () => {
  let component: BikesListComponent;
  let fixture: ComponentFixture<BikesListComponent>;
  let store: MockStore;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    activatedRoute = { snapshot: {} } as ActivatedRoute;

    await TestBed.configureTestingModule({
      imports: [BikesListComponent, getTranslocoModule()],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRoute },
        provideMockStore({
          selectors: [
            { selector: selectCity, value: null },
            { selector: selectBikes, value: [] },
            { selector: selectBikesLoading, value: false },
          ],
        }),
      ],
    }).compileComponents();

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component and have default signals', () => {
    expect(component).toBeTruthy();
    expect(component.selectedCity()).toBe(null);
    expect(component.bikes()).toEqual([]);
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
