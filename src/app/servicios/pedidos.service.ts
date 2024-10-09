import { Injectable } from '@angular/core';
import { IPedidos } from '../models/pedidos';
import { AngularFireDatabase, AngularFireDatabaseModule, AngularFireList } from '@angular/fire/database';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private PedidosCollection: AngularFireList<IPedidos>;
  lst_pedidos: Observable<IPedidos[]>;

  constructor(private readonly db:AngularFireDatabase) { 
    this.PedidosCollection = db.list(":80/Pedido");
    this.lst_pedidos = this.PedidosCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data = a.payload.toJSON() as IPedidos;
        const id = a.payload.key;
        return data; 
      }))
    );
  }


  ObtenerTodosPedidos(){
    return this.lst_pedidos;
  }

  ActualizaPedidos(ObjPedido : IPedidos){

    let aux="0";
    const cad = ObjPedido.Fecha;
    const valor = cad.substring(cad.length-1,cad.length)
    if(valor=="0"){
      aux="1";
    }
    let fecha = cad.substring(0,cad.length-1)
    fecha=fecha + aux;

    return this.PedidosCollection.update(ObjPedido.PedidoID,{
      Fecha: fecha
    });
  }

}
