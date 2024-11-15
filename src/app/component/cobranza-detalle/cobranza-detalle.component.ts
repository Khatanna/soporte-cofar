import { Component,Inject, Optional,OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CobranzadetService } from 'src/app/servicios/cobranzadet.service';

@Component({
  selector: 'app-cobranza-detalle',
  templateUrl: './cobranza-detalle.component.html',
  styleUrls: ['./cobranza-detalle.component.scss']
})

export class CobranzaDetalleComponent implements OnInit {

  displayedColumns: string[] = ['AbonoID','KUNNR','CodRecibo', 'FechaModificacion', 'CODSBO', 'CodFactura', 'ImporteBS', 'ImporteUSD'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }

  constructor(
    private cobranzasServicesdet: CobranzadetService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CobranzaDetalleComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: {name: string}  // recepcion del parametro enviado desde cobranzas, no lo estoy usando
    ) {}

  ngOnInit(): void {
    this.cobranzasServicesdet.ObtenerAbonosPorID(this.data.name).subscribe(resp=>this.dataSource.data=resp)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //ActualizaDetalleRecibo
  UpdateDetalleRecibo(){
    this.cobranzasServicesdet.ActualizaDetRecibos();
  }

  openSnackBarAbonos() {
    this._snackBar.open("Abonos Actualizados", "Cerrar", {
      duration: 2500,
    });
  }
  
}
