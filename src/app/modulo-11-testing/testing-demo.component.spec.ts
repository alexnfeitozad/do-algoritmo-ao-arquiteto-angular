import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TestingDemoComponent } from './testing-demo.component';

describe('TestingDemoComponent', () => {
  let component: TestingDemoComponent;
  let fixture: ComponentFixture<TestingDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingDemoComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(TestingDemoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate initial passed tests correctly', () => {
    expect(component.totalPassaram()).toBe(4);
    expect(component.totalFalharam()).toBe(0);
  });
});
