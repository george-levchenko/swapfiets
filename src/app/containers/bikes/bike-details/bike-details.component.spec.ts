import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BikeDetailsComponent } from './bike-details.component';
import { ActivatedRoute } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { cleanBikeDetails, getBikeDetails } from '../store/bikes.actions';
import { selectBikesLoading, selectSelectedBike } from '../store/bikes.selectors';
import { TranslocoService } from '@jsverse/transloco';
import { fakeBike } from '../../../../tests/unit/fake-bike.const';
import { getTranslocoModule } from '../../../../tests/unit/transloco-testing.module';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('BikeDetailsComponent', () => {
  let component: BikeDetailsComponent;
  let fixture: ComponentFixture<BikeDetailsComponent>;
  let store: MockStore;
  let activatedRoute: ActivatedRoute;
  let translocoService: TranslocoService;

  beforeEach(async () => {
    activatedRoute = { snapshot: { params: { id: 42 } } } as unknown as ActivatedRoute;

    await TestBed.configureTestingModule({
      imports: [BikeDetailsComponent, getTranslocoModule()],
      providers: [
        TitleCasePipe,
        { provide: ActivatedRoute, useValue: activatedRoute },
        provideMockStore({
          selectors: [
            { selector: selectSelectedBike, value: fakeBike },
            { selector: selectBikesLoading, value: false },
          ],
        }),
      ],
    }).compileComponents();

    translocoService = TestBed.inject(TranslocoService);
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should dispatch getBikeDetails on init and set breadcrumb items', () => {
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

    translocoService.setActiveLang('nl');
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
