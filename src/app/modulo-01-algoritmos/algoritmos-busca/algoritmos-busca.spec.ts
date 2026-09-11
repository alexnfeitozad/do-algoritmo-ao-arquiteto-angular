import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AlgoritmosBusca } from './algoritmos-busca';

describe('AlgoritmosBusca', () => {
  let component: AlgoritmosBusca;
  let fixture: ComponentFixture<AlgoritmosBusca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgoritmosBusca],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AlgoritmosBusca);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
