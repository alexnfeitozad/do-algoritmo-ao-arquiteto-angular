import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PooTypescript } from './poo-typescript';

describe('PooTypescript', () => {
  let component: PooTypescript;
  let fixture: ComponentFixture<PooTypescript>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PooTypescript],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PooTypescript);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
