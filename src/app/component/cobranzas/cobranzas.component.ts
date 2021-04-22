import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CobranzasService } from '../../servicios/cobranzas.service';
import { MatSort } from '@angular/material/sort';
import { ICobranzas } from 'src/app/models/cobranzas';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-cobranzas',
  templateUrl: './cobranzas.component.html',
  styleUrls: ['./cobranzas.component.scss']
})
export class CobranzasComponent implements OnInit {

  displayedColumns: string[] = ['Copy','ReciboID', 'CodRecibo', 'Estado', 'Fecha', 'FechaDoc', 'FormaPago', 'IdVendedor', 'ImpTotalBS', 'ImpTotalUSD','KUNNR','Moneda','NombreCliente','NroDocumento','NroPosiciones','Observacion','Update'];
  dataSource = new MatTableDataSource();

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }

  constructor(private cobranzasServices: CobranzasService, private _snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.cobranzasServices.ObtenerTodasCobranzas().subscribe(resp=>this.dataSource.data=resp)
  }  

  openSnackBar(codrec: string, idven: string) {
    this._snackBar.open("Actualizado:   Rec " + codrec + " - " + idven, "Cerrar", {
      duration: 4000,
    });
  }

  SnackBarCopy() {
    this._snackBar.open("Copiado al portapales", "Cerrar", {
      duration: 1000,
    });
  }

  //Para hacer el ordenamiento
   @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  //ActualizaRecibo
  UpdateRecibo(obj:ICobranzas){
    console.log(obj);
    this.cobranzasServices.ActualizaRecibos(obj);
  }

}
