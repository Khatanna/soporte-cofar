import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],  
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = ['Cargo', 'CodUsuario', 'CodigoSap', 'Contrasena', 'Division', 'DivisionID', 'Nombre', 'Organizacion', 'Regional'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }

  constructor(private usuariosServices: UsuariosService) { }
  ngOnInit(): void {
    this.usuariosServices.ObtenerTodosUsuarios().subscribe(resp=>this.dataSource.data=resp)
  }

}