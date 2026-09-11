import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PerformanceDemoComponent } from './performance-demo.component';

describe('PerformanceDemoComponent', () => {
  let component: PerformanceDemoComponent;
  let fixture: ComponentFixture<PerformanceDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceDemoComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PerformanceDemoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment parent counter on click', () => {
    expect(component.contadorPai()).toBe(0);
    component.incrementarPai();
    expect(component.contadorPai()).toBe(1);
  });
});
