import { Injectable } from '@angular/core';
import { IUsuarios } from '../models/usuarios';
import { AngularFireDatabase, AngularFireDatabaseModule, AngularFireList } from '@angular/fire/database';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private UsuariosCollection: AngularFireList<IUsuarios>;
  lst_usuarios: Observable<IUsuarios[]>;

  constructor(private readonly db:AngularFireDatabase) { 
    this.UsuariosCollection = db.list(":80/Usuario");
    this.lst_usuarios = this.UsuariosCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data = a.payload.toJSON() as IUsuarios;
        const id = a.payload.key;
        return data; 
      }))
    );
  }

  ObtenerTodosUsuarios(){
    return this.lst_usuarios;
  }
}
