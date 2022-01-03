import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICobranzasdet } from '../models/cobranzadet';

@Injectable({
  providedIn: 'root'
})
export class CobranzadetService {

  private CobranzasCollection: AngularFireList<ICobranzasdet>;
  lst_cobranzasDet: Observable<ICobranzasdet[]>;

  var_reciboId : string | any;

  constructor(private readonly db:AngularFireDatabase) { 
    
    this.var_reciboId = localStorage.getItem("var_reciboId");  // variable localglobal no es optimo pero funciona por ahora
    this.CobranzasCollection = db.list(":80/Abono", ref => { return ref.orderByChild("ReciboID").equalTo(localStorage.getItem("var_reciboId"))});

    this.lst_cobranzasDet = this.CobranzasCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data = a.payload.toJSON() as ICobranzasdet;
        return data;
      }))
    );
  }

  ObtenerAbonosPorID(reciboID : string){  // parametro enviado reciboID no estoy usando, esto para el futuro.
    this.Obtenerregis(this.db);  
    return this.lst_cobranzasDet;
  }

  Obtenerregis(dbs:AngularFireDatabase) {
        
        this.var_reciboId = localStorage.getItem("var_reciboId");  // variable localglobal no es optimo pero funciona por ahora
        this.CobranzasCollection = dbs.list(":80/Abono", ref => { return ref.orderByChild("ReciboID").equalTo(this.var_reciboId)});
    
        this.lst_cobranzasDet = this.CobranzasCollection.snapshotChanges().pipe(
          map( actions => actions.map( a => {
            const data = a.payload.toJSON() as ICobranzasdet;
            return data;
          }))
        );
  }


  ActualizaDetRecibos(){

    var i=0;
    this.lst_cobranzasDet.forEach(element => { 

      let aux="0";
      const cad = element[0].FechaModificacion;
      const valor = cad.substring(cad.length-1,cad.length)
      if(valor=="0"){
        aux="1";
      }
      let fecha = cad.substring(0,cad.length-1)
      fecha=fecha + aux;
/*
      return this.CobranzasCollection.update(element[0].ReciboID,{
        FechaModificacion: fecha
      });
*/
    });

  }
}
