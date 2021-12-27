import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PedidosdetService } from 'src/app/servicios/pedidosdet.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.component.html',
  styleUrls: ['./pedido-detalle.component.scss']
})
export class PedidoDetalleComponent implements OnInit {

  displayedColumns: string[] = ['PedidoDetalleID','Almacen','Cantidad', 'FechaModificacion', 'NroPedido', 'ProductCode', 'Producto', 'Moneda', 'PrecioUnitario', 'SubTotalNeto','SubTotalDesc', 'SubTotal'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }

  constructor(   
    private pedidoServicesdet: PedidosdetService,
    public dialogRef: MatDialogRef<PedidoDetalleComponent>) {}

  ngOnInit(): void {
    this.pedidoServicesdet.ObtenerDetallePorID().subscribe(resp=>this.dataSource.data=resp)
  }

}
