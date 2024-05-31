import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EuromillonesInterface } from 'src/app/models/euromillones.interface';
import { ResultadosService } from 'src/app/services/resultados.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-d-euromillones',
  templateUrl: './d-euromillones.component.html',
  styleUrls: ['./d-euromillones.component.scss']
})
export class DEuromillonesComponent {
  publicacionForm!: FormGroup;

  nombre!: string;
  numero!: string;
  combs: number[] = [];
  numeros: number[] = [];
  numerosE: number[] = [];

  constructor(private formBuilder: FormBuilder,
    private _sorteo: ResultadosService,
    private dialogRef: MatDialogRef<DEuromillonesComponent>,
    private _alerts: SweetAlertService) {

    this.publicacionForm = this.formBuilder.group({

      fecha: [null, Validators.required],
      comb1: [null, Validators.required],
      comb2: [null, Validators.required],
      comb3: [null, Validators.required],
      comb4: [null, Validators.required],
      comb5: [null, Validators.required],
      estrella1: [null, Validators.required],
      estrella2: [null, Validators.required],
    });
    this.numeros = Array.from({ length: 50 }, (_, i) => i + 1);
    this.numerosE = Array.from({ length: 12 }, (_, i) => i + 1);
  }

  onSubmit() {
    var date:Date=this.publicacionForm.get('fecha')?.value;
    if(date.getHours()==0){
      date.setHours(date.getHours()+5);
    }
    var bono:EuromillonesInterface={
      fecha: date,
      combinacion: [this.publicacionForm.get('comb1')?.value, this.publicacionForm.get('comb2')?.value, this.publicacionForm.get('comb3')?.value, this.publicacionForm.get('comb4')?.value, this.publicacionForm.get('comb5')?.value],
      estrellas: [this.publicacionForm.get('estrella1')?.value,this.publicacionForm.get('estrella2')?.value],
    }

    this._sorteo.postEuromillones(bono).subscribe({
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

  agregarFecha(){
    var hoy =new Date();
    console.log(hoy);
    const diaSegundos= 24*60*60*1000;
    var ayer= new Date(hoy.getTime()-diaSegundos);
    console.log(ayer);
    this.publicacionForm.patchValue({ fecha: ayer },{ onlySelf: true, emitEvent: false });
  }
}
