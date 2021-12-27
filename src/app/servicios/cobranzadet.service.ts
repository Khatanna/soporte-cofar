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
  private id_rec : string | any;

  var_reciboId : string | any;

  constructor(private readonly db:AngularFireDatabase) { 

    // variable local 
    this.var_reciboId = localStorage.getItem("var_reciboId");

    this.CobranzasCollection = db.list(":80/Abono", ref => { return ref.orderByChild("ReciboID").equalTo(localStorage.getItem("var_reciboId"))});

    this.lst_cobranzasDet = this.CobranzasCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data = a.payload.toJSON() as ICobranzasdet;
        return data;
      }))
    );
  }

  ObtenerAbonosPorID(reciboID : string){
    this.id_rec = reciboID;
    return this.lst_cobranzasDet;
  }
}
