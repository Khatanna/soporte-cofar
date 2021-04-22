import { TestBed } from '@angular/core/testing';

import { CobranzasService } from './cobranzas.service';

describe('CobranzasService', () => {
  let service: CobranzasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CobranzasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
