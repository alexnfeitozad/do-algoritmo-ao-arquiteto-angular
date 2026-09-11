import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RoutingDemoComponent } from './routing-demo.component';

describe('RoutingDemoComponent', () => {
  let component: RoutingDemoComponent;
  let fixture: ComponentFixture<RoutingDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutingDemoComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(RoutingDemoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle unsaved changes flag', () => {
    component.onConteudoChange('Texto não salvo');
    expect(component.temAlteracoesNaoSalvas).toBe(true);
    component.salvarRascunho();
    expect(component.temAlteracoesNaoSalvas).toBe(false);
  });
});
