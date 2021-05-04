import { Component } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { VistasComponent } from "./component/vistas/vistas.component";
import { PedidosComponent } from "./component/pedidos/pedidos.component";
import { CobranzasComponent } from "./component/cobranzas/cobranzas.component";
import { UsuariosComponent } from "./component/usuarios/usuarios.component";

const app_routes: Routes = [
    { path: 'vistas', component: VistasComponent},
    { path: 'pedidos', component: PedidosComponent},
    { path: 'cobranzas', component: CobranzasComponent},
    { path: 'usuarios', component: UsuariosComponent},
    
    //{ path: '**', pathMatch: 'full', redirectTo: 'vistas'}
];

export const app_routing = RouterModule.forRoot(app_routes);