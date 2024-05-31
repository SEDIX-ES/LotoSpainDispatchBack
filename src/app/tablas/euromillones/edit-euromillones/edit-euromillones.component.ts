import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EuromillonesInterface } from 'src/app/models/euromillones.interface';
import { ResultadosService } from 'src/app/services/resultados.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-euromillones',
  templateUrl: './edit-euromillones.component.html',
  styleUrls: ['./edit-euromillones.component.scss']
})
export class EditEuromillonesComponent {
  publicacionForm!: FormGroup;

  nombre!: string;
  numero!: string;
  combs: number[] = [];
  numeros: number[] = [];
  numerosE: number[] = [];

  constructor(private formBuilder: FormBuilder,
    private _results: ResultadosService,
    private dialogRef: MatDialogRef<EditEuromillonesComponent>,
    private _alerts: SweetAlertService,
    @Inject(MAT_DIALOG_DATA) public data: EuromillonesInterface) {

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

    this.publicacionForm.get('fecha')?.setValue(data.fecha);
    this.publicacionForm.get('comb1')?.setValue(data.combinacion[0]);
    this.publicacionForm.get('comb2')?.setValue(data.combinacion[1]);
    this.publicacionForm.get('comb3')?.setValue(data.combinacion[2]);
    this.publicacionForm.get('comb4')?.setValue(data.combinacion[3]);
    this.publicacionForm.get('comb5')?.setValue(data.combinacion[4]);
    this.publicacionForm.get('estrella1')?.setValue(data.estrellas[0]);
    this.publicacionForm.get('estrella2')?.setValue(data.estrellas[1]);
  }

  onSubmit() {
    this.data.combinacion= [this.publicacionForm.get('comb1')?.value, this.publicacionForm.get('comb2')?.value, this.publicacionForm.get('comb3')?.value, this.publicacionForm.get('comb4')?.value, this.publicacionForm.get('comb5')?.value];
    this.data.estrellas= [this.publicacionForm.get('estrella1')?.value,this.publicacionForm.get('estrella2')?.value];

    this._results.putEuromillones(this.data.fecha.toString(),this.data).subscribe({
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

  eliminarEuromillones(){
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
        this._results.deleteResultado(this.data.fecha.toString(),"Euromillones").subscribe({
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
