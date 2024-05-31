import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GordoInterface } from 'src/app/models/gordo.interface';
import { ResultadosService } from 'src/app/services/resultados.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-gordo',
  templateUrl: './edit-gordo.component.html',
  styleUrls: ['./edit-gordo.component.scss']
})
export class EditGordoComponent {
  publicacionForm!: FormGroup;

  nombre!: string;
  numero!: string;
  combs: number[] = [];
  numeros: number[] = [];
  numerosE: number[] = [];
  seleccionados: number[] = [];

  constructor(private formBuilder: FormBuilder,
    private _results: ResultadosService,
    private dialogRef: MatDialogRef<EditGordoComponent>,
    private _alerts: SweetAlertService,
    @Inject(MAT_DIALOG_DATA) public data: GordoInterface) {

    this.publicacionForm = this.formBuilder.group({
      fecha: [null, Validators.required],
      comb1: [null, Validators.required],
      comb2: [null, Validators.required],
      comb3: [null, Validators.required],
      comb4: [null, Validators.required],
      comb5: [null, Validators.required],
      clave: [null, Validators.required],
    });
    this.numeros = Array.from({ length: 54 }, (_, i) => i + 1);
    this.numerosE = Array.from({ length: 10 }, (_, i) => i);

    this.publicacionForm.get('fecha')?.setValue(data.fecha);
    this.publicacionForm.get('comb1')?.setValue(data.combinacion[0]);
    this.publicacionForm.get('comb2')?.setValue(data.combinacion[1]);
    this.publicacionForm.get('comb3')?.setValue(data.combinacion[2]);
    this.publicacionForm.get('comb4')?.setValue(data.combinacion[3]);
    this.publicacionForm.get('comb5')?.setValue(data.combinacion[4]);
    this.publicacionForm.get('clave')?.setValue(data.clave);
  }

  onSubmit() {
    this.data.combinacion= [this.publicacionForm.get('comb1')?.value, this.publicacionForm.get('comb2')?.value, this.publicacionForm.get('comb3')?.value, this.publicacionForm.get('comb4')?.value, this.publicacionForm.get('comb5')?.value];
    this.data.clave= this.publicacionForm.get('clave')?.value;

    this._results.putGordo(this.data.fecha.toString(),this.data).subscribe({
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

  eliminarGordo(){
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
        this._results.deleteResultado(this.data.fecha.toString(),"ElGordo").subscribe({
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
