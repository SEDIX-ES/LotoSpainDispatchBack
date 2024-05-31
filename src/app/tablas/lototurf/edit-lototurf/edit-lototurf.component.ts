import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LototurfInterface } from 'src/app/models/lototurf.interface';
import { ResultadosService } from 'src/app/services/resultados.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-lototurf',
  templateUrl: './edit-lototurf.component.html',
  styleUrls: ['./edit-lototurf.component.scss']
})
export class EditLototurfComponent {
  publicacionForm!: FormGroup;

  nombre!: string;
  numero!: string;
  combs: number[] = [];
  numeros: number[] = [];
  numerosC: number[] = [];
  numerosR: number[] = [];


  constructor(private formBuilder: FormBuilder,
    private _results: ResultadosService,
    private dialogRef: MatDialogRef<EditLototurfComponent>,
    private _alerts: SweetAlertService,
    @Inject(MAT_DIALOG_DATA) public data: LototurfInterface) {

    this.publicacionForm = this.formBuilder.group({
      fecha: [null, Validators.required],
      jornada: [null, Validators.required],
      comb1: [null, Validators.required],
      comb2: [null, Validators.required],
      comb3: [null, Validators.required],
      comb4: [null, Validators.required],
      comb5: [null, Validators.required],
      comb6: [null, Validators.required],
      comp: [null, Validators.required],
      reintegro: [null, Validators.required],
    });
    this.numeros = Array.from({ length: 31 }, (_, i) => i + 1);
    this.numerosR = Array.from({ length: 10 }, (_, i) => i);
    this.numerosC = Array.from({ length: 12 }, (_, i) => i + 1);

    this.publicacionForm.get('fecha')?.setValue(data.fecha);
    this.publicacionForm.get('jornada')?.setValue(data.jornada);
    this.publicacionForm.get('comb1')?.setValue(data.combinacion[0]);
    this.publicacionForm.get('comb2')?.setValue(data.combinacion[1]);
    this.publicacionForm.get('comb3')?.setValue(data.combinacion[2]);
    this.publicacionForm.get('comb4')?.setValue(data.combinacion[3]);
    this.publicacionForm.get('comb5')?.setValue(data.combinacion[4]);
    this.publicacionForm.get('comb6')?.setValue(data.combinacion[5]);
    this.publicacionForm.get('comp')?.setValue(data.caballo);
    this.publicacionForm.get('reintegro')?.setValue(data.reintegro);
  }

  onSubmit() {
    this.data.combinacion= [this.publicacionForm.get('comb1')?.value, this.publicacionForm.get('comb2')?.value, this.publicacionForm.get('comb3')?.value, this.publicacionForm.get('comb4')?.value, this.publicacionForm.get('comb5')?.value, this.publicacionForm.get('comb6')?.value];
    this.data.caballo= this.publicacionForm.get('comp')?.value;
    this.data.reintegro= this.publicacionForm.get('reintegro')?.value;

    this._results.putLototurf(this.data.fecha.toString(),this.data).subscribe({
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

  eliminarLototurf(){
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
        this._results.deleteResultado(this.data.fecha.toString(),"Lototurf").subscribe({
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
