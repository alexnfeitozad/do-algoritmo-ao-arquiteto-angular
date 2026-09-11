import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { StateManagementComponent } from './state-management.component';

describe('StateManagementComponent', () => {
  let component: StateManagementComponent;
  let fixture: ComponentFixture<StateManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateManagementComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(StateManagementComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute subtotal and total correctly with signals', () => {
    expect(component.subtotal()).toBeGreaterThan(0);
    expect(component.totalFinal()).toBeLessThan(component.subtotal());
  });

  it('should increase quantity when aumentarQuantidade is called', () => {
    const item = component.carrinho()[0];
    const initialQty = item.quantidade;
    component.aumentarQuantidade(item.id);
    const updated = component.carrinho().find(i => i.id === item.id);
    expect(updated?.quantidade).toBe(initialQty + 1);
  });
});
