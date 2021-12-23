import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './component/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { VistasComponent } from './component/vistas/vistas.component';
import { PedidosComponent } from './component/pedidos/pedidos.component';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { app_routing } from "./app.router"
import { VisitasService } from './servicios/visitas.service'

// firebase
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule, AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { CobranzasComponent } from './component/cobranzas/cobranzas.component';
import { UsuariosComponent } from './component/usuarios/usuarios.component';

import { MatSortModule } from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { CobranzaDetalleComponent } from './component/cobranza-detalle/cobranza-detalle.component';
import { PedidoDetalleComponent } from './component/pedido-detalle/pedido-detalle.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VistasComponent,
    PedidosComponent,
    CobranzasComponent,
    UsuariosComponent,
    CobranzaDetalleComponent,
    PedidoDetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    app_routing,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSortModule,
    MatSnackBarModule,
    ClipboardModule,
    MatDialogModule,

    //firebase
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.configurarFirebase),
    AngularFireDatabaseModule
  ],
  providers: [VisitasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
