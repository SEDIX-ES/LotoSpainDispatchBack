import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Partido } from 'src/app/models/partido.interface';
import { QuinigolInterface } from 'src/app/models/quinigol.interface';
import { ResultadosService } from 'src/app/services/resultados.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-d-quinigol',
  templateUrl: './d-quinigol.component.html',
  styleUrls: ['./d-quinigol.component.scss']
})
export class DQuinigolComponent {
  publicacionForm!: FormGroup;

  nombre!: string;
  numero!: string;
  combs: number[] = [];
  numeros: number[] = [];
  numerosC: number[] = [];
  numerosR: number[] = [];


  constructor(private formBuilder: FormBuilder,
    private _sorteo: ResultadosService,
    private dialogRef: MatDialogRef<DQuinigolComponent>,
    private _alerts: SweetAlertService) {
    this.publicacionForm = this.formBuilder.group({

      fecha: [null, Validators.required],
      jornada: [null, Validators.required],
      equipo11: [null, Validators.required],
      equipo21: [null, Validators.required],
      marcador11: [null, Validators.required],
      marcador21: [null, Validators.required],
      equipo12: [null, Validators.required],
      equipo22: [null, Validators.required],
      marcador12: [null, Validators.required],
      marcador22: [null, Validators.required],
      equipo13: [null, Validators.required],
      equipo23: [null, Validators.required],
      marcador13: [null, Validators.required],
      marcador23: [null, Validators.required],
      equipo14: [null, Validators.required],
      equipo24: [null, Validators.required],
      marcador14: [null, Validators.required],
      marcador24: [null, Validators.required],
      equipo15: [null, Validators.required],
      equipo25: [null, Validators.required],
      marcador15: [null, Validators.required],
      marcador25: [null, Validators.required],
      equipo16: [null, Validators.required],
      equipo26: [null, Validators.required],
      marcador16: [null, Validators.required],
      marcador26: [null, Validators.required],
    });
    this.numeros = Array.from({ length: 6 }, (_, i) => i + 1);
  }

  onSubmit() {
    var date:Date=this.publicacionForm.get('fecha')?.value;
    if(date.getHours()==0){
      date.setHours(date.getHours()+5);
    }
    var bono:QuinigolInterface={
      fecha: date,
      jornada: this.publicacionForm.get('jornada')?.value,
      partidos: [],
    }

    for(let i = 1; i <=6; i++){
      var par: Partido= {
        local: this.publicacionForm.get('equipo1'+i)?.value,
        visitante: this.publicacionForm.get('equipo2'+i)?.value,
        resultado: this.publicacionForm.get('marcador1'+i)?.value +"-" +this.publicacionForm.get('marcador2'+i)?.value
      }
      bono.partidos.push(par);
    }

    console.log(bono);
    this._sorteo.postQuinigol(bono).subscribe({
      next:(res:any)=>{
        this.closeDialog();
      },
      error:(err)=>{
        console.log("ERROR AL CREAR EL RESULTADO", err);
        this._alerts.error("ERROR AL CREAR EL RESULTADO","");
      },
      complete:()=>{}
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  agregarFecha(){
    var hoy =new Date();
    console.log(hoy);
    const diaSegundos= 24*60*60*1000;
    var ayer= new Date(hoy.getTime()-diaSegundos);
    console.log(ayer);
    this.publicacionForm.patchValue({ fecha: ayer },{ onlySelf: true, emitEvent: false });
  }
}
