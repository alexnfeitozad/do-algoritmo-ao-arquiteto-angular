import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FundamentosAlgoritmos } from './fundamentos-algoritmos';

describe('FundamentosAlgoritmos', () => {
  let component: FundamentosAlgoritmos;
  let fixture: ComponentFixture<FundamentosAlgoritmos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundamentosAlgoritmos],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(FundamentosAlgoritmos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate Big-O operations correctly', () => {
    component.bigONSize.set(10);
    component.selectedBigO.set('O(1)');
    expect(component.calculatedOperations()).toBe(1);

    component.selectedBigO.set('O(n)');
    expect(component.calculatedOperations()).toBe(10);

    component.selectedBigO.set('O(n²)');
    expect(component.calculatedOperations()).toBe(100);
  });

  it('should step through the algorithm debugger', () => {
    expect(component.currentStepIndex()).toBe(-1);
    component.nextStep();
    expect(component.currentStepIndex()).toBe(0);
    expect(component.executionLog().length).toBe(1);
  });
});
