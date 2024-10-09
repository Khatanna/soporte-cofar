import { Injectable } from '@angular/core';

import {
  AngularFireDatabase,
  AngularFireDatabaseModule,
  AngularFireList,
} from '@angular/fire/database';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IVisitas } from '../models/visitas';

@Injectable({
  providedIn: 'root',
})
export class VisitasService {
  OrgVen: any;

  private VisitasCollection: AngularFireList<IVisitas>;
  lst_visitas: Observable<IVisitas[]>;

  constructor(private readonly db: AngularFireDatabase) {
    this.OrgVen = localStorage.getItem('OrgVentas');
    this.VisitasCollection = db.list(':80/Actividad/' + this.OrgVen);
    this.lst_visitas = this.VisitasCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.toJSON() as IVisitas;
          const id = a.payload.key;
          return data;
        })
      )
    );
  }

  ObtenerTodasVisitas() {
    this.ObtenerListadoFirebasevisitas(this.db);
    return this.lst_visitas;
  }

  ObtenerListadoFirebasevisitas(dbs: AngularFireDatabase) {
    this.OrgVen = localStorage.getItem('OrgVentas'); // variable localglobal no es optimo pero funciona por ahora
    this.VisitasCollection = dbs.list(':80/Actividad/' + this.OrgVen);

    this.lst_visitas = this.VisitasCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.toJSON() as IVisitas;
          const id = a.payload.key;
          return data;
        })
      )
    );
  }
}
