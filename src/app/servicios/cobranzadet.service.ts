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

  constructor(private readonly db:AngularFireDatabase) { 
    this.CobranzasCollection = db.list(":80/Abono");
    this.lst_cobranzasDet = this.CobranzasCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data = a.payload.toJSON() as ICobranzasdet;
        const id = a.payload.key;
        return data; 
      }))
    );
  }

  ObtenerAbonosPorID(){
    return this.lst_cobranzasDet;
  }
}
