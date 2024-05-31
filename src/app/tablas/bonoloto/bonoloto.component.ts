import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoteInterface } from 'src/app/models/bote.interface';
import { BonolotoInterface } from 'src/app/models/bonoloto.interface';
import { DBonolotoComponent } from 'src/app/resultados/d-bonoloto/d-bonoloto.component';
import { BBonolotoComponent } from 'src/app/botes/b-bonoloto/b-bonoloto.component';
import { ResultadosService } from 'src/app/services/resultados.service';
import { BotesService } from 'src/app/services/botes.service';
import { EditBonolotoComponent } from './edit-bonoloto/edit-bonoloto.component';
import Swal from 'sweetalert2';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-bonoloto',
  templateUrl: './bonoloto.component.html',
  styleUrls: [
    './bonoloto.component.scss',
    './queries/bonoloto.component-mobile.scss',
  ],
})
export class BonolotoComponent implements OnInit {
  pageNumber: number = 1;
  pageSize: number = 5;
  numeros!: number[];
  bonoloto: BonolotoInterface[] = [];
  botes: BoteInterface[] = [];

  constructor(public dialog: MatDialog,
    private http: HttpClient,
    private _results: ResultadosService,
    private _botesService: BotesService,
    private _alerts: SweetAlertService) {}

  ngOnInit(): void {
    this.getResultados();
  }

  generarGanador() {
    const dialogRef = this.dialog.open(DBonolotoComponent, {});
    console.log('Producto nuevo');

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado', result);
      this.getResultados();
    });
  }

  generarBote() {
    const dialogRef = this.dialog.open(BBonolotoComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado', result);
      this.getBotes();
    });
  }

  editBono(bono: BonolotoInterface) {
    const dialogRef = this.dialog.open(EditBonolotoComponent, {
      data:bono,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado', result);
      this.getResultados();
    });
  }

  millones(cantidad: number): string {
    if (cantidad / 1000000 > 1) {
      return cantidad / 1000000 + ' MILLONES DE EUROS';
    } else {
      return cantidad + '€';
    }
  }

  getResultados() {
    this._results.getGanadores("Bonoloto").subscribe({
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
    this._botesService.getBotesSorteo('Bonoloto').subscribe({
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
