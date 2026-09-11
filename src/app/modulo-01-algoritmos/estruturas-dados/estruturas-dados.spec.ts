import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EstruturasDados } from './estruturas-dados';

describe('EstruturasDados', () => {
  let component: EstruturasDados;
  let fixture: ComponentFixture<EstruturasDados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstruturasDados],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(EstruturasDados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
