import { TestBed } from '@angular/core/testing';

import { UsuarioDetalleService } from './usuario-detalle.service';

describe('UsuarioDetalleService', () => {
  let service: UsuarioDetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioDetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
