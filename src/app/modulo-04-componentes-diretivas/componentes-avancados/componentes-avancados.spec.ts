import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ComponentesAvancados } from './componentes-avancados';

describe('ComponentesAvancados', () => {
  let component: ComponentesAvancados;
  let fixture: ComponentFixture<ComponentesAvancados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentesAvancados],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentesAvancados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
