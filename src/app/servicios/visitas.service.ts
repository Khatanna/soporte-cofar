import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireDatabaseModule, AngularFireList } from '@angular/fire/database';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IVisitas } from '../models/visitas'


@Injectable({
  providedIn: 'root'
})
export class VisitasService {

  private VisitasCollection: AngularFireList<IVisitas>;
  lst_visitas: Observable<IVisitas[]>;

  constructor(private readonly db:AngularFireDatabase) { 
    this.VisitasCollection = db.list(":80/Actividad/1100");
    this.lst_visitas = this.VisitasCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data = a.payload.toJSON() as IVisitas;
        const id = a.payload.key;
        return data; 
      }))
    );
  }

  ObtenerTodasVisitas(){
    return this.lst_visitas;
  }
}
