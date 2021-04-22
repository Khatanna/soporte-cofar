import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { VisitasService } from '../../servicios/visitas.service';

@Component({
  selector: 'app-vistas',
  templateUrl: './vistas.component.html',
  styleUrls: ['./vistas.component.scss']
})
export class VistasComponent implements OnInit {

  displayedColumns: string[] = ['ActividadID', 'CodVendedor', 'CodUsuario', 'Estado', 'FechaCrea', 'Kunnr', 'NombreCliente', 'OrgVenta'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }

  constructor( private visitasServices: VisitasService ) { }
  ngOnInit(): void {
    this.visitasServices.ObtenerTodasVisitas().subscribe(resp=>this.dataSource.data=resp);   // console.log(resp)
  }
}
