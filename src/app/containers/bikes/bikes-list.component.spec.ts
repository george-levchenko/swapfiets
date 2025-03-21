import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikesListComponent } from './bikes-list.component';
import { Store } from '@ngrx/store';

describe('BikesListComponent', () => {
  let component: BikesListComponent;
  let fixture: ComponentFixture<BikesListComponent>;

  beforeEach(async () => {
    const storeStub = {
      selectSignal: jasmine.createSpy('selectSignal').and.returnValue(() => []),
      dispatch: jasmine.createSpy('dispatch'),
    };

    await TestBed.configureTestingModule({
      imports: [BikesListComponent],
      providers: [{ provide: Store, useValue: storeStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(BikesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
