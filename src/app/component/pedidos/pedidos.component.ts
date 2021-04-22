import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PedidosService } from '../../servicios/pedidos.service';
import { MatSort } from '@angular/material/sort';
import { IPedidos } from 'src/app/models/pedidos';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  displayedColumns: string[] = ['PedidoID','NroPosiciones', 'Estado', 'Fecha', 'CodCanal', 'CodSector', 'CodUsuario', 'MontoTotal','Moneda', 'Nit','KUNNR','RazonSocial','NroPedido','NroSAP','MensajeTec','Update'];
  dataSource = new MatTableDataSource();

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }

  constructor(private pedidosService: PedidosService, private _snackBar: MatSnackBar) { }
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

}
