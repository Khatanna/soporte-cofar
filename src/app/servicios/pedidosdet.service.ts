import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPedidosDet } from '../models/pedidosdet';

@Injectable({
  providedIn: 'root'
})
export class PedidosdetService {

  private PedidoCollection: AngularFireList<IPedidosDet>;
  lst_pedidosDet: Observable<IPedidosDet[]>;

  var_pedidoId : string | any;

  constructor(private readonly db:AngularFireDatabase) {
    this.PedidoCollection = db.list(":80/PedidoDetalle", ref => { return ref.orderByChild("PedidoID").equalTo(localStorage.getItem("var_pedidoId"))});

    this.lst_pedidosDet = this.PedidoCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data = a.payload.toJSON() as IPedidosDet;
        return data;
      }))
    );
   }

   
  ObtenerDetallePorID(){  
    this.ConsultaPedidoDetFirebase(this.db);  
    return this.lst_pedidosDet;
  }


  ConsultaPedidoDetFirebase(db: AngularFireDatabase) {
    this.PedidoCollection = db.list(":80/PedidoDetalle", ref => { return ref.orderByChild("PedidoID").equalTo(localStorage.getItem("var_pedidoId"))});

    this.lst_pedidosDet = this.PedidoCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data = a.payload.toJSON() as IPedidosDet;
        return data;
      }))
    );
  }
}


