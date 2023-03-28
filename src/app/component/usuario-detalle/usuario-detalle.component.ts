import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUsuarios } from 'src/app/models/usuarios';
import { UsuarioDetalleService } from 'src/app/servicios/usuario-detalle.service';

@Component(
  { selector: 'app-usuario-detalle', templateUrl: './usuario-detalle.component.html', styleUrls: ['./usuario-detalle.component.scss'] }
)
export class UsuarioDetalleComponent implements OnInit {

  diasPedidoSel: number;
  diasCobranzaSel: number;
  diasFacturaSel: number;
  puedeModificarDias: boolean;

  diasToleranciaList = [
    {
      value: 0,
      viewValue: 'al dia'
    }, {
      value: 1,
      viewValue: '1 dia '
    }, {
      value: 3,
      viewValue: '3 dias'
    }, {
      value: 5,
      viewValue: '5 dias'
    }, {
      value: 15,
      viewValue: '15 dias'
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<UsuarioDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public usuario: IUsuarios,
    private servicio: UsuarioDetalleService
  ) {
    this.diasPedidoSel = 0;
    this.diasCobranzaSel = 0;
    this.diasFacturaSel = 0;
    this.puedeModificarDias = false;

    console.log("dias pedido " + usuario.DiasToleranciaTipoCambioPedido);

    if (Number.isInteger(usuario.DiasToleranciaTipoCambioPedido))
      this.diasPedidoSel = usuario.DiasToleranciaTipoCambioPedido;

    if (Number.isInteger(usuario.DiasToleranciaTipoCambioCobranza))
      this.diasCobranzaSel = usuario.DiasToleranciaTipoCambioCobranza;

    if (Number.isInteger(usuario.DiasToleranciaTipoCambioFactura))
      this.diasFacturaSel = usuario.DiasToleranciaTipoCambioFactura;

    if (usuario?.PuedeModificarDiasToleranciaTipoCambio) {
      this.puedeModificarDias = usuario.PuedeModificarDiasToleranciaTipoCambio == 'SI' ? true : false;
    }
  }

  ngOnInit() { }

  onCancelar(): void {
    this.dialogRef.close();
  }

  onAceptar(): void {

    this.usuario.DiasToleranciaTipoCambioPedido = this.diasPedidoSel;
    this.usuario.DiasToleranciaTipoCambioCobranza = this.diasCobranzaSel;
    this.usuario.DiasToleranciaTipoCambioFactura = this.diasFacturaSel;
    this.usuario.PuedeModificarDiasToleranciaTipoCambio = this.puedeModificarDias? "SI" : "NO";
    var codUsuario = this.usuario.CodUsuario.replace('.','_');
    console.log(codUsuario);

    this.servicio.update(codUsuario, this.usuario).then(() => console.log("actualizado")).catch(ex => console.error("Error: " + ex));

    this.dialogRef.close();
  }


}
