import { Injectable } from '@angular/core';
import { ICobranzas } from '../models/cobranzas';
import { AngularFireDatabase, AngularFireDatabaseModule, AngularFireList } from '@angular/fire/database';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CobranzasService {

  private CobranzasCollection: AngularFireList<ICobranzas>;
  lst_cobranzas: Observable<ICobranzas[]>;

  constructor(private readonly db:AngularFireDatabase) { 
    this.CobranzasCollection = db.list(":80/Recibo");
    this.lst_cobranzas = this.CobranzasCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data = a.payload.toJSON() as ICobranzas;
        const id = a.payload.key;
        return data; 
      }))
    );
  }

  ObtenerTodasCobranzas(){
    return this.lst_cobranzas;
  }

  ActualizaRecibos(ObjRecibo : ICobranzas){

    let aux="0";
    const cad = ObjRecibo.Fecha;
    const valor = cad.substring(cad.length-1,cad.length)
    if(valor=="0"){
      aux="1";
    }
    let fecha = cad.substring(0,cad.length-1)
    fecha=fecha + aux;

    return this.CobranzasCollection.update(ObjRecibo.ReciboID,{
      Fecha: fecha
    });
  }
}
