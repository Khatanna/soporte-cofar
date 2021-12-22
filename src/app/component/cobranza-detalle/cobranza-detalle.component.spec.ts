import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobranzaDetalleComponent } from './cobranza-detalle.component';

describe('CobranzaDetalleComponent', () => {
  let component: CobranzaDetalleComponent;
  let fixture: ComponentFixture<CobranzaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CobranzaDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CobranzaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
