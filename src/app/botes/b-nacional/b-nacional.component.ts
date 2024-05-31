import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BoteNacionalInterface } from 'src/app/models/boteNacional.interface';
import { BotesService } from 'src/app/services/botes.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-b-nacional',
  templateUrl: './b-nacional.component.html',
  styleUrls: ['./b-nacional.component.scss']
})
export class BNacionalComponent {
  publicacionForm!: FormGroup;
  tipo: string[] = ['Jueves', 'Sábado', 'Extraordinario'];
  extra: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<BNacionalComponent>,
    private _alerts: SweetAlertService,
    private _bote: BotesService) {
    this.publicacionForm = this.formBuilder.group({

      fecha: [null, Validators.required],
      numero: [null, Validators.required],
      tipo: [null, Validators.required],
      nombreExtra: [null,],
    });
  }

  onSubmit() {
    var date:Date=this.publicacionForm.get('fecha')?.value;
    if(date.getHours()==0){
      date.setHours(date.getHours()+5);
    }
    var bote: BoteNacionalInterface={
      id: 0,
      id_nacional: 0,
      fecha: date,
      cantidad: this.publicacionForm.get('numero')?.value,
      tipo: this.publicacionForm.get('tipo')?.value,
      sorteo: 'Nacional',
      nombreExtra: this.publicacionForm.get('nombreExtra')?.value,
    }
    this._bote.postBoteNacional(bote).subscribe({
      next:(res:any)=>{
        this.dialogRef.close();
      },
      error:(err)=>{
        console.log("ERROR AL CREAR EL BOTE", err);
        this._alerts.error("ERROR AL CREAR EL BOTE","");
      },
      complete: ()=>{},
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  agregarFecha(){
    var hoy =new Date();
    this.publicacionForm.patchValue({ fecha: hoy },{ onlySelf: true, emitEvent: false });
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
}
