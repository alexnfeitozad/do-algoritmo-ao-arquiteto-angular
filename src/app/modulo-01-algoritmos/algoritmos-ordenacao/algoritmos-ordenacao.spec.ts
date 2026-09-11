import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlgoritmosOrdenacao } from './algoritmos-ordenacao';

describe('AlgoritmosOrdenacao', () => {
  let component: AlgoritmosOrdenacao;
  let fixture: ComponentFixture<AlgoritmosOrdenacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgoritmosOrdenacao],
    }).compileComponents();

    fixture = TestBed.createComponent(AlgoritmosOrdenacao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
