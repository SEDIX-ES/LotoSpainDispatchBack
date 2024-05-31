import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BEuromillonesComponent } from 'src/app/botes/b-euromillones/b-euromillones.component';
import { BoteInterface } from 'src/app/models/bote.interface';
import { EuromillonesInterface } from 'src/app/models/euromillones.interface';
import { DEuromillonesComponent } from 'src/app/resultados/d-euromillones/d-euromillones.component';
import { BotesService } from 'src/app/services/botes.service';
import { ResultadosService } from 'src/app/services/resultados.service';
import { EditEuromillonesComponent } from './edit-euromillones/edit-euromillones.component';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-euromillones',
  templateUrl: './euromillones.component.html',
  styleUrls: ['./euromillones.component.scss']
})
export class EuromillonesComponent {
  pageNumber: number = 1;
  pageSize: number = 5;
  numeros!: number[];
  bonoloto: EuromillonesInterface[] = [];
  botes: BoteInterface[] = [];

  constructor(public dialog: MatDialog,
    private http: HttpClient,
    private _resultados: ResultadosService,
    private _botesService: BotesService,
    private _alerts: SweetAlertService) {}

  ngOnInit(): void {
    this.getResultados();
  }

  generarGanador() {
    const dialogRef = this.dialog.open(DEuromillonesComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado', result);
      this.getResultados();
    });
  }
  editEuromillones(datos: EuromillonesInterface) {
    const dialogRef = this.dialog.open(EditEuromillonesComponent, {
      data:datos,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado', result);
      this.getResultados();
    });
  }

  generarBote() {
    const dialogRef = this.dialog.open(BEuromillonesComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado', result);
      this.getBotes();
    });
  }

  millones(cantidad: number): string {
    if (cantidad / 1000000 > 1) {
      return cantidad / 1000000 + ' MILLONES DE EUROS';
    } else {
      return cantidad+"€";
    }
  }

  getResultados() {
    this._resultados.getGanadores("Euromillones").subscribe({
      next: (res:any)=>{
        this.bonoloto=res;
        console.log(this.bonoloto);
        this.getBotes();
      },
      error: (err)=>{
        console.log("ERROR AL CARGAR LOS RESULTADOS", err);
      },
      complete: ()=>{},
    })
  }

  getBotes(){
    this._botesService.getBotesSorteo('Euromillones').subscribe({
      next: (res:any)=>{
        this.botes=res;
        console.log(this.botes);
      },
      error: (err)=>{
        console.log("ERROR AL OBTENER LOS BOTES", err);
      },
      complete:()=>{}
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
