import { TestBed } from '@angular/core/testing';

import { CobranzadetService } from './cobranzadet.service';

describe('CobranzadetService', () => {
  let service: CobranzadetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CobranzadetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
