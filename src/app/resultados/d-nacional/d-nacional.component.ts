import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NacionalInterface } from 'src/app/models/nacional.inerface';
import { ResultadosService } from 'src/app/services/resultados.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-d-nacional',
  templateUrl: './d-nacional.component.html',
  styleUrls: ['./d-nacional.component.scss'],
})
export class DNacionalComponent {
  publicacionForm!: FormGroup;


  combs: number[] = [];
  numeros: number[] = [];
  numerosE: number[] = [];
  seleccionados: number[] = [];
  tipo: string[] = ['Jueves', 'Sábado', 'Extraordinario'];
  extra: boolean=false;

  constructor(private formBuilder: FormBuilder,
    private _sorteo: ResultadosService,
    private dialogRef: MatDialogRef<DNacionalComponent>,
    private _alerts: SweetAlertService) {

      this.publicacionForm = this.formBuilder.group({
      fecha: [null, Validators.required],
      tipo: [null, Validators.required],
      ganador1: [null, Validators.required],
      ganador2: [null, Validators.required],
      reint1: [null, Validators.required],
      reint2: [null, Validators.required],
      reint3: [null, Validators.required],
      nombreExtra: [null, ],
    });
    this.numerosE = Array.from({ length: 10 }, (_, i) => i);
  }

  onSubmit() {
    var date:Date=this.publicacionForm.get('fecha')?.value;
    if(date.getHours()==0){
      date.setHours(date.getHours()+5);
    }
    var bono:NacionalInterface={
      fecha: date,
      tipo: this.publicacionForm.get('tipo')?.value,
      combinacion1: this.publicacionForm.get('ganador1')?.value,
      combinacion2: this.publicacionForm.get('ganador2')?.value,
      reintegros: [this.publicacionForm.get('reint1')?.value,this.publicacionForm.get('reint2')?.value,this.publicacionForm.get('reint3')?.value],
      nombreExtra: this.publicacionForm.get('nombreExtra')?.value,
    }

    this._sorteo.postNacional(bono).subscribe({
      next:(res:any)=>{
        this.closeDialog()
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

  comprobarExtra(){
    console.log(this.publicacionForm.get('tipo')?.value);
    console.log(this.extra);
    if (this.publicacionForm.get('tipo')?.value?.toLowerCase() === "extraordinario") {
      this.extra=true;
      console.log(this.extra);
    } else {
      this.extra=false;
    }
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
