import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeDetailsComponent } from './bike-details.component';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

describe('BikeDetailsComponent', () => {
  let component: BikeDetailsComponent;
  let fixture: ComponentFixture<BikeDetailsComponent>;

  beforeEach(async () => {
    const storeStub = {
      selectSignal: jasmine.createSpy('selectSignal').and.returnValue(() => []),
      dispatch: jasmine.createSpy('dispatch'),
    };

    await TestBed.configureTestingModule({
      imports: [BikeDetailsComponent, RouterModule.forRoot([])],
      providers: [{ provide: Store, useValue: storeStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(BikeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
