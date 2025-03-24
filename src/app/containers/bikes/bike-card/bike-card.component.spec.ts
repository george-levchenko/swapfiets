import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BikeCardComponent } from './bike-card.component';
import { fakeBike } from '../../../../tests/unit/fake-bike.const';

describe('BikeCardComponent', () => {
  let component: BikeCardComponent;
  let fixture: ComponentFixture<BikeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BikeCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeCardComponent);
    component = fixture.componentInstance;
    // Set required input signal
    fixture.componentRef.setInput('bike', fakeBike);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
