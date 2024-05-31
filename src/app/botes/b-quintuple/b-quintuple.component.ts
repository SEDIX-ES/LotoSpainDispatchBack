import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BoteInterface } from 'src/app/models/bote.interface';
import { BotesService } from 'src/app/services/botes.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-b-quintuple',
  templateUrl: './b-quintuple.component.html',
  styleUrls: ['./b-quintuple.component.scss']
})
export class BQuintupleComponent {
  publicacionForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<BQuintupleComponent>,
    private _alerts: SweetAlertService,
    private _bote: BotesService) {
    this.publicacionForm = this.formBuilder.group({

      fecha: [null, Validators.required],
      numero: [null, Validators.required],
      jornada: [null, Validators.required],
    });
  }

  onSubmit() {
    var date:Date=this.publicacionForm.get('fecha')?.value;
    if(date.getHours()==0){
      date.setHours(date.getHours()+5);
    }
    var bote: BoteInterface={
      id: 0,
      fecha: date,
      cantidad: this.publicacionForm.get('numero')?.value,
      jornada: this.publicacionForm.get('jornada')?.value,
      sorteo: 'Quintuple',
    }
    this._bote.postBote(bote).subscribe({
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
}
