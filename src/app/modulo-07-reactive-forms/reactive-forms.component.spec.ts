import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ReactiveFormsComponent } from './reactive-forms.component';

describe('ReactiveFormsComponent', () => {
  let component: ReactiveFormsComponent;
  let fixture: ComponentFixture<ReactiveFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveFormsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create and initialize invalid form', () => {
    expect(component).toBeTruthy();
    expect(component.cadastroForm.valid).toBe(false);
  });

  it('should add skill dynamically', () => {
    const initialSkills = component.habilidades.length;
    component.adicionarHabilidade('Docker');
    expect(component.habilidades.length).toBe(initialSkills + 1);
  });
});
