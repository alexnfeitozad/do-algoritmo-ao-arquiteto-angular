import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { HttpApisComponent } from './http-apis.component';

describe('HttpApisComponent', () => {
  let component: HttpApisComponent;
  let fixture: ComponentFixture<HttpApisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpApisComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HttpApisComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
