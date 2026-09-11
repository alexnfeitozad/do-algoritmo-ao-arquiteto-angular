import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 14 modules by default', () => {
    expect(component.filteredModules().length).toBe(14);
  });

  it('should filter modules when phase is selected', () => {
    component.setPhase(1);
    expect(component.filteredModules().length).toBe(3);

    component.setPhase(2);
    expect(component.filteredModules().length).toBe(7);

    component.setPhase(3);
    expect(component.filteredModules().length).toBe(4);
  });
});
