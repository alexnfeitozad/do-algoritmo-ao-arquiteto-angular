import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PatternsDemoComponent, PagamentoCartao } from './patterns-demo.component';

describe('PatternsDemoComponent', () => {
  let component: PatternsDemoComponent;
  let fixture: ComponentFixture<PatternsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatternsDemoComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PatternsDemoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate and process payment with Strategy pattern', () => {
    component.selecionarEstrategia(new PagamentoCartao());
    component.processarPagamento();
    expect(component.resultadoProcessamento()).toContain('Cartão autorizado');
  });
});
