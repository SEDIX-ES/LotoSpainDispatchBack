import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BoteInterface } from 'src/app/models/bote.interface';
import { BotesService } from 'src/app/services/botes.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-b-euromillones',
  templateUrl: './b-euromillones.component.html',
  styleUrls: ['./b-euromillones.component.scss']
})
export class BEuromillonesComponent {
  publicacionForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<BEuromillonesComponent>,
    private _alerts: SweetAlertService,
    private _bote: BotesService) {
    this.publicacionForm = this.formBuilder.group({

      fecha: [null, Validators.required],
      numero: [null, Validators.required],
    });
  }

  onSubmit() {
    var date:Date=this.publicacionForm.get('fecha')?.value;
    if(date.getHours()==0){
      date.setHours(date.getHours()+5);
    }
    var bote: BoteInterface={
      id:0,
      fecha: date,
      cantidad: this.publicacionForm.get('numero')?.value,
      sorteo:'Euromillones'
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
