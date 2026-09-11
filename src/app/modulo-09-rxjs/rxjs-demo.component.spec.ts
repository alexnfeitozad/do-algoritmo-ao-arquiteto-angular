import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RxjsDemoComponent } from './rxjs-demo.component';

describe('RxjsDemoComponent', () => {
  let component: RxjsDemoComponent;
  let fixture: ComponentFixture<RxjsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsDemoComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(RxjsDemoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter even numbers when filter is pares', () => {
    component.filtroSelecionado = 'pares';
    component.aplicarOperadoresStream();
    expect(component.streamProcessado).toEqual([2, 4, 6, 8]);
  });
});
