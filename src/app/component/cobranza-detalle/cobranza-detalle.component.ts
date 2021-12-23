import { Component,Inject, Optional,OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-cobranza-detalle',
  templateUrl: './cobranza-detalle.component.html',
  styleUrls: ['./cobranza-detalle.component.scss']
})
export class CobranzaDetalleComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CobranzaDetalleComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

  ngOnInit(): void {
  }

}
