import { TestBed } from '@angular/core/testing';

import { PedidosdetService } from './pedidosdet.service';

describe('PedidosdetService', () => {
  let service: PedidosdetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidosdetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
