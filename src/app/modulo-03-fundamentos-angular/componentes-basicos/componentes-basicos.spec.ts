import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ComponentesBasicos } from './componentes-basicos';

describe('ComponentesBasicos', () => {
  let component: ComponentesBasicos;
  let fixture: ComponentFixture<ComponentesBasicos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentesBasicos],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentesBasicos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
