import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BNacionalComponent } from 'src/app/botes/b-nacional/b-nacional.component';
import { BoteInterface } from 'src/app/models/bote.interface';
import { BoteNacionalInterface } from 'src/app/models/boteNacional.interface';
import { NacionalInterface } from 'src/app/models/nacional.inerface';
import { DNacionalComponent } from 'src/app/resultados/d-nacional/d-nacional.component';
import { BotesService } from 'src/app/services/botes.service';
import { ResultadosService } from 'src/app/services/resultados.service';
import { EditNacionalComponent } from './edit-nacional/edit-nacional.component';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nacional',
  templateUrl: './nacional.component.html',
  styleUrls: ['./nacional.component.scss'],
})
export class NacionalComponent {
  pageNumber: number = 1;
  pageSize: number = 5;
  numeros!: number[];
  bonoloto: NacionalInterface[] = [];
  botes: BoteNacionalInterface[] = [];

  constructor(public dialog: MatDialog,
    private http: HttpClient,
    private _resultados: ResultadosService,
    private _botesService: BotesService,
    private _alerts: SweetAlertService) {}

  ngOnInit(): void {
    this.getResultados();
  }

  generarGanador() {
    const dialogRef = this.dialog.open(DNacionalComponent, {});
    console.log('Producto nuevo');

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado', result);
      this.getResultados();
    });
  }
  editarNacional(datos:NacionalInterface) {
    const dialogRef = this.dialog.open(EditNacionalComponent, {
      data:datos,
    });
    console.log('Producto nuevo');

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado', result);
      this.getResultados();
    });
  }

  generarBote() {
    const dialogRef = this.dialog.open(BNacionalComponent, {});
    console.log('Producto nuevo');

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado', result);
      this.getBotes();
    });
  }

  editBoleto() {}

  millones(cuantia: number): string {
    if (cuantia / 1000000 > 1) {
      return cuantia / 1000000 + ' MILLONES DE EUROS';
    } else {
      return cuantia + '€';
    }
  }

  getResultados() {
    this._resultados.getGanadores("Nacional").subscribe({
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
    this._botesService.getBotesSorteo('Nacional').subscribe({
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
