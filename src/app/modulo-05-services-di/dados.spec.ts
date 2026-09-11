import { TestBed } from '@angular/core/testing';
import { DadosService } from './dados';

describe('DadosService', () => {
  let service: DadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
