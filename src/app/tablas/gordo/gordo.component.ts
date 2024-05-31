import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BGordoComponent } from 'src/app/botes/b-gordo/b-gordo.component';
import { BoteInterface } from 'src/app/models/bote.interface';
import { GordoInterface } from 'src/app/models/gordo.interface';
import { DGordoComponent } from 'src/app/resultados/d-gordo/d-gordo.component';
import { BotesService } from 'src/app/services/botes.service';
import { ResultadosService } from 'src/app/services/resultados.service';
import { EditGordoComponent } from './edit-gordo/edit-gordo.component';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gordo',
  templateUrl: './gordo.component.html',
  styleUrls: ['./gordo.component.scss'],
})
export class GordoComponent {
  pageNumber: number = 1;
  pageSize: number = 5;
  numeros!: number[];
  bonoloto: GordoInterface[] = [];
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
    const dialogRef = this.dialog.open(DGordoComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado', result);
      this.getResultados();
    });
  }

  editarGordo(datos:GordoInterface) {
    const dialogRef = this.dialog.open(EditGordoComponent, {
      data:datos,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado', result);
      this.getResultados();
    });
  }

  generarBote() {
    const dialogRef = this.dialog.open(BGordoComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado', result);
      this.getBotes();
    });
  }

  cargaMasiva() {
    console.log('Carga masiva');
  }

  editBoleto() {}

  millones(cantidad: number): string {
    if (cantidad / 1000000 > 1) {
      return cantidad / 1000000 + ' MILLONES DE EUROS';
    } else {
      return cantidad + '€';
    }
  }

  getResultados() {
    this._resultados.getGanadores("Gordo").subscribe({
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
    this._botesService.getBotesSorteo('ElGordo').subscribe({
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
