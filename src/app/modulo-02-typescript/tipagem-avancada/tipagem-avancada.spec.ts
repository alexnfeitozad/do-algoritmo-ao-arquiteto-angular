import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TipagemAvancada } from './tipagem-avancada';

describe('TipagemAvancada', () => {
  let component: TipagemAvancada;
  let fixture: ComponentFixture<TipagemAvancada>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipagemAvancada],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TipagemAvancada);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
