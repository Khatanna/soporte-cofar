import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PedidosService } from '../../servicios/pedidos.service';
import { MatSort } from '@angular/material/sort';
import { IPedidos } from 'src/app/models/pedidos';
import {MatSnackBar} from '@angular/material/snack-bar';
import { PedidoDetalleComponent } from '../pedido-detalle/pedido-detalle.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  displayedColumns: string[] = ['View','Copy','PedidoID','NroPosiciones', 'Estado', 'Fecha', 'CodCanal', 'CodSector', 'CodUsuario', 'MontoTotal','Moneda', 'Nit','KUNNR','RazonSocial','NroPedido','NroSAP','Pendiente','MensajeTec','Update'];
  dataSource = new MatTableDataSource();

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  constructor(
    private pedidosService: PedidosService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
    ) { }
    
  ngOnInit(): void {
     this.pedidosService.ObtenerTodosPedidos().subscribe(resp=>this.dataSource.data=resp)
  }

  openSnackBar(codrec: string, idven: string) {
    this._snackBar.open("Actualizado:   Pedido " + codrec + " - " + idven, "Cerrar", {
      duration: 4000,
    });
  }

  //Para hacer el ordenamiento
   @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  //ActualizaPedido
  UpdatePedido(obj:IPedidos){
    console.log(obj);
    this.pedidosService.ActualizaPedidos(obj);
  }

  SnackBarCopy() {
    this._snackBar.open("Copiado al portapales", "Cerrar", {
      duration: 1000,
    });
  }

  openDialog(obj:IPedidos) {
    localStorage.setItem("var_pedidoId", obj.PedidoID);  // esta es la forma de asignar un valor local es de tipo string en este caso;

    const dialogRef = this.dialog.open(PedidoDetalleComponent, {
      data: {name: obj.PedidoID},
      width: "100%"
    });
  }

}
