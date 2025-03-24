import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BikeCardComponent } from './bike-card.component';
import { Bike } from '../../../models/interfaces/bike.interface';

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
    // Provide a valid Bike object
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
    fixture.componentRef.setInput('bike', fakeBike);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
