import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { TranslocoTestingModule } from '@jsverse/transloco';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        RouterModule.forRoot([]),
        TranslocoTestingModule.forRoot({
          langs: { en: {}, nl: {} },
          translocoConfig: {
            availableLangs: ['en', 'nl'],
            defaultLang: 'en',
          },
        }),
      ],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /bikes when goToBikes is called', () => {
    component.goToBikes();
    expect(router.navigate).toHaveBeenCalledWith(['/bikes']);
  });
});
