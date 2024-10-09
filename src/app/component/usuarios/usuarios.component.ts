import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IUsuarios } from 'src/app/models/usuarios';
import { UsuariosService } from '../../servicios/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioDetalleComponent } from '../usuario-detalle/usuario-detalle.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = ['CodUsuario', 'CodigoSap', 'Contrasena', 'Division', 'Nombres', 'Regional','Fecha', 'Version','Menu'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  constructor(private usuariosServices: UsuariosService, public dialog: MatDialog) {

   }


  ngOnInit(): void {
    this.usuariosServices.ObtenerTodosUsuarios().subscribe(resp=>this.dataSource.data=resp)
  }

  openDialog(user:IUsuarios) {
    //localStorage.setItem("var_codUsuario", obj.CodUsuario);  // esta es la forma de asignar un valor local es de tipo string en este caso;

    console.log("enviando" + user.CodUsuario)

    const dialogRef = this.dialog.open(UsuarioDetalleComponent, {
      data: user,
      width: "100%",
      id:"modal_user"
    });
  }



}
