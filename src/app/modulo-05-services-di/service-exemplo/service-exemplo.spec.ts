import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ServiceExemploComponent } from './service-exemplo';

describe('ServiceExemploComponent', () => {
  let component: ServiceExemploComponent;
  let fixture: ComponentFixture<ServiceExemploComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceExemploComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceExemploComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
