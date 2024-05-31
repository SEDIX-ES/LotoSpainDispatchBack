import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BQuinielaComponent } from 'src/app/botes/b-quiniela/b-quiniela.component';
import { BoteInterface } from 'src/app/models/bote.interface';
import { QuinielaInterface } from 'src/app/models/quiniela.interface';
import { DQuinielaComponent } from 'src/app/resultados/d-quiniela/d-quiniela.component';
import { QdetallesComponent } from './qdetalles/qdetalles.component';
import { ResultadosService } from 'src/app/services/resultados.service';
import { BotesService } from 'src/app/services/botes.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiniela',
  templateUrl: './quiniela.component.html',
  styleUrls: ['./quiniela.component.scss'],
})
export class QuinielaComponent {
  bonoloto: QuinielaInterface[] = [];
  botes: BoteInterface[] = [];

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private _resultados: ResultadosService,
    private _botesService: BotesService,
    private _alerts: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.getResultados();
  }

  generarGanador() {
    const dialogRef = this.dialog.open(DQuinielaComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado', result);
      this.getResultados();
    });
  }

  generarBote() {
    const dialogRef = this.dialog.open(BQuinielaComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado', result);
      this.getBotes();
    });
  }

  millones(cantidad: number): string {
    if (cantidad / 1000000 > 1) {
      return cantidad / 1000000 + ' MILLONES DE EUROS';
    } else {
      return cantidad + '€';
    }
  }

  obtenerResultado(cadena: string): string {
    var division: string[] = cadena.split('-');
    if (parseInt(division[0]) >= 3) {
      division[0] = 'M';
    }
    if (parseInt(division[1]) >= 3) {
      division[1] = 'M';
    }
    return division[0] + '-' + division[1];
  }

  abrirDetalles(jornada: QuinielaInterface) {
    const dialogRef = this.dialog.open(QdetallesComponent, {
      data: jornada,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado', result);
      this.getResultados();
    });
  }

  getResultados() {
    this._resultados.getGanadores('Quiniela').subscribe({
      next: (res: any) => {
        this.bonoloto = res;
        console.log(this.bonoloto);
        this.getBotes();
      },
      error: (err) => {
        console.log('ERROR AL CARGAR LOS RESULTADOS', err);
      },
      complete: () => {},
    });
  }

  getBotes() {
    this._botesService.getBotesSorteo('Quiniela').subscribe({
      next: (res: any) => {
        this.botes = res;
        console.log(this.botes);
      },
      error: (err) => {
        console.log('ERROR AL OBTENER LOS BOTES', err);
      },
      complete: () => {},
    });
  }

  eliminarBote(bote:BoteInterface){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Este cambio no es reversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._alerts.loading()
        this._botesService.deleteBote(bote.id).subscribe({
          next: (res:any)=>{
            this._alerts.confirm();
            this.getResultados();
          },
          error: (res)=>{
            this._alerts.error("Error al eliminar el registro", "");
          },
          complete:()=>{}
        })
      }
    })
  }
}
