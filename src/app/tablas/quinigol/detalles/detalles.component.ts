import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Partido } from 'src/app/models/partido.interface';
import { QuinielaRowInterface } from 'src/app/models/quinielaRow.interface';
import { QuinigolInterface } from 'src/app/models/quinigol.interface';
import { ResultadosService } from 'src/app/services/resultados.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import Swal from 'sweetalert2';
import { EditQuinigolComponent } from '../edit-quinigol/edit-quinigol.component';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent {
  constructor(private dialogRef: MatDialogRef<DetallesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QuinigolInterface,
    private _alerts: SweetAlertService,
    private _results: ResultadosService,
    private dialog: MatDialog){}

  obtenerResultado(cadena: string): string {
    var division: string[] = cadena.split('-');
    if (parseInt(division[0]) >= 3) {
      division[0]="M";
    }
    if (parseInt(division[1]) >= 3) {
      division[1]="M";
    }
    return division[0]+"-"+division[1];
  }

  closeDialog(){
    this.dialogRef.close();
  }

  eliminarQuinigol() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este cambio es irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._alerts.loading();
        this._results
          .deleteResultado(this.data.fecha.toString(), 'Quinigol')
          .subscribe({
            next: (res: any) => {
              this._alerts.confirm();
              this.closeDialog();
            },
            error: (res) => {
              this._alerts.error('Error al eliminar el registro', '');
            },
            complete: () => {},
          });
      }
    });
  }

  editarPartido(partido:Partido){
    var aux: QuinielaRowInterface={
      fecha: this.data.fecha,
      jornada: this.data.jornada,
      partidos: partido,
      local:partido.local,
    }
    const dialogRef = this.dialog.open(EditQuinigolComponent, {
      data: aux,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado', result);
      this.closeDialog();
    });
  }
}
