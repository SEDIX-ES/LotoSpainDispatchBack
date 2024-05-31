import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Partido } from 'src/app/models/partido.interface';
import { QuinielaInterface } from 'src/app/models/quiniela.interface';
import { EditPartidoComponent } from '../edit-partido/edit-partido.component';
import { QuinielaRowInterface } from 'src/app/models/quinielaRow.interface';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import Swal from 'sweetalert2';
import { ResultadosService } from 'src/app/services/resultados.service';

@Component({
  selector: 'app-qdetalles',
  templateUrl: './qdetalles.component.html',
  styleUrls: ['./qdetalles.component.scss'],
})
export class QdetallesComponent {
  constructor(
    private dialogRef: MatDialogRef<QdetallesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QuinielaInterface,
    public dialog: MatDialog,
    public _alerts: SweetAlertService,
    public _results: ResultadosService
  ) {}

  obtenerResultado(cadena: string): string {
    var division: string[] = cadena.split('-');
    if (parseInt(division[0]) > parseInt(division[1])) {
      return '1';
    } else if (parseInt(division[0]) == parseInt(division[1])) {
      return 'X';
    } else {
      return '2';
    }
  }
  obtenerPleno(cadena: string): string {
    var division: string[] = cadena.split('-');
    if (parseInt(division[0]) >= 3) {
      division[0] = 'M';
    }
    if (parseInt(division[1]) >= 3) {
      division[1] = 'M';
    }
    return division[0] + '-' + division[1];
  }

  editarPartido(partido:Partido){
    var aux: QuinielaRowInterface={
      fecha: this.data.fecha,
      jornada: this.data.jornada,
      partidos: partido,
      local:partido.local,
    }
    const dialogRef = this.dialog.open(EditPartidoComponent, {
      data: aux,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado', result);
      this.closeDialog();
    });
  }

  eliminarQuiniela(){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Este cambio es irreversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._alerts.loading()
        this._results.deleteResultado(this.data.fecha.toString(),"Quiniela").subscribe({
          next: (res:any)=>{
            this._alerts.confirm();
          },
          error: (res)=>{
            this._alerts.error("Error al eliminar el registro", "");
          },
          complete:()=>{}
        })
      }
    })
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
