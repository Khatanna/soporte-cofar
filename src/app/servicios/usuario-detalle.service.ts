import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUsuarios } from '../models/usuarios';


@Injectable({ providedIn: 'root' }) export class UsuarioDetalleService {

    private child =  ':80/Usuario/';

    constructor(private db: AngularFireDatabase) {
        }

    update(codUsuario:string, objUsuario:IUsuarios):Promise<void > {

      return this.db.object(this.child + codUsuario).update({
          DiasToleranciaTipoCambioPedido : objUsuario.DiasToleranciaTipoCambioPedido,
          DiasToleranciaTipoCambioCobranza : objUsuario.DiasToleranciaTipoCambioCobranza,
          DiasToleranciaTipoCambioFactura : objUsuario.DiasToleranciaTipoCambioFactura,
          PuedeModificarDiasToleranciaTipoCambio : objUsuario.PuedeModificarDiasToleranciaTipoCambio
         });
    }

}
