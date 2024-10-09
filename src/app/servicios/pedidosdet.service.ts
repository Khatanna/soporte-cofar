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
  private lst: Observable<IPedidosDet[]>;
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

    this.lst = this.lst_pedidosDet;
   }


  ObtenerDetallePorID(){
    this.ConsultaPedidoDetFirebase(this.db);
    this.lst = this.lst_pedidosDet;
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


  ActualizaDetallePedido(){

    var y=0;
    for( var x in this.lst){

      console.log(x)
      y++;
    }


    var i=0;
    this.lst.forEach(element => {

      let aux="0";
      const cad = element[i].FechaModificacion;
      const valor = cad.substring(cad.length-1,cad.length)
      if(valor=="0"){
        aux="1";
      }
      let fecha = cad.substring(0,cad.length-1)
      fecha=fecha + aux;

      console.log(element[i].PedidoDetalleID);
      i++;

      return this.PedidoCollection.update(element[i-1].PedidoDetalleID,{
        FechaModificacion: fecha
      });

    });
  }

}


