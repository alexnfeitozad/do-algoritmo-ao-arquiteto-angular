import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProjetoFinalComponent } from './projeto-final.component';

describe('ProjetoFinalComponent', () => {
  let component: ProjetoFinalComponent;
  let fixture: ComponentFixture<ProjetoFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetoFinalComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjetoFinalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle enrollment correctly', () => {
    const curso = component.cursos()[0];
    const initialStatus = curso.inscrito;
    component.toggleInscricao(curso.id);
    const atualizado = component.cursos().find(c => c.id === curso.id);
    expect(atualizado?.inscrito).toBe(!initialStatus);
  });

  it('should compute KPIs accurately', () => {
    const kpis = component.kpis();
    expect(kpis.total).toBe(5);
    expect(kpis.inscritos).toBeGreaterThanOrEqual(1);
  });
});
