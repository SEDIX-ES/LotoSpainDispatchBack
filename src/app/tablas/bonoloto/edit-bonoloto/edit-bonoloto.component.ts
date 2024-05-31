import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BonolotoInterface } from 'src/app/models/bonoloto.interface';
import { ResultadosService } from 'src/app/services/resultados.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-bonoloto',
  templateUrl: './edit-bonoloto.component.html',
  styleUrls: ['./edit-bonoloto.component.scss']
})
export class EditBonolotoComponent {
  publicacionForm!: FormGroup;

  nombre!: string;
  numero!: string;
  combs: number[] = [];
  numeros: number[] = [];
  numerosE: number[] = [];

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditBonolotoComponent>,
    private _alerts: SweetAlertService,
    private _results: ResultadosService,
    @Inject(MAT_DIALOG_DATA) public data: BonolotoInterface) {
    this.publicacionForm = this.formBuilder.group({

      fecha: [null, Validators.required],
      comb1: [null, Validators.required],
      comb2: [null, Validators.required],
      comb3: [null, Validators.required],
      comb4: [null, Validators.required],
      comb5: [null, Validators.required],
      comb6: [null, Validators.required],
      comp: [null, Validators.required],
      reintegro: [null, Validators.required],
    });
    this.numeros = Array.from({ length: 49 }, (_, i) => i + 1); // Rango de números del 1 al 49
    this.numerosE = Array.from({ length: 9 }, (_, i) => i + 1); // Rango de números del 1 al 49

    this.publicacionForm.get('fecha')?.setValue(data.fecha);
    this.publicacionForm.get('comb1')?.setValue(data.combinacion[0]);
    this.publicacionForm.get('comb2')?.setValue(data.combinacion[1]);
    this.publicacionForm.get('comb3')?.setValue(data.combinacion[2]);
    this.publicacionForm.get('comb4')?.setValue(data.combinacion[3]);
    this.publicacionForm.get('comb5')?.setValue(data.combinacion[4]);
    this.publicacionForm.get('comb6')?.setValue(data.combinacion[5]);
    this.publicacionForm.get('comp')?.setValue(data.complementario);
    this.publicacionForm.get('reintegro')?.setValue(data.reintegro);

  }

  onSubmit() {
    this.data.combinacion= [this.publicacionForm.get('comb1')?.value,this.publicacionForm.get('comb2')?.value,this.publicacionForm.get('comb3')?.value,this.publicacionForm.get('comb4')?.value,this.publicacionForm.get('comb5')?.value,this.publicacionForm.get('comb6')?.value];
    this.data.complementario= this.publicacionForm.get('comp')?.value;
    this.data.reintegro= this.publicacionForm.get('reintegro')?.value;
    this._results.putBonoloto(this.data.fecha.toString(), this.data).subscribe({
      next: (res:any)=>{
        this.closeDialog();
      },
      error: (err)=>{
        this._alerts.error("Error al actualizar el resultado","");
      },
      complete: ()=>{}
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

  eliminarBonoloto(){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Este cambio es irreversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._alerts.loading()
        this._results.deleteResultado(this.data.fecha.toString(),"Bonoloto").subscribe({
          next: (res:any)=>{
            this._alerts.confirm();
            this.closeDialog();
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
