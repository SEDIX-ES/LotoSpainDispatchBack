import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrimitivaInterface } from 'src/app/models/primitiva.interface';
import { ResultadosService } from 'src/app/services/resultados.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-primitiva',
  templateUrl: './edit-primitiva.component.html',
  styleUrls: ['./edit-primitiva.component.scss'],
})
export class EditPrimitivaComponent {
  publicacionForm!: FormGroup;
  numeros: number[] = [];
  numerosR: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private _results: ResultadosService,
    private dialogRef: MatDialogRef<EditPrimitivaComponent>,
    private _alerts: SweetAlertService,
    @Inject(MAT_DIALOG_DATA) public data: PrimitivaInterface) {
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
    this.numeros = Array.from({ length: 49 }, (_, i) => i + 1);
    this.numerosR = Array.from({ length: 10 }, (_, i) => i);

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
    this.data.combinacion = [
      this.publicacionForm.get('comb1')?.value,
      this.publicacionForm.get('comb2')?.value,
      this.publicacionForm.get('comb3')?.value,
      this.publicacionForm.get('comb4')?.value,
      this.publicacionForm.get('comb5')?.value,
      this.publicacionForm.get('comb6')?.value,
    ];
    this.data.complementario = this.publicacionForm.get('comp')?.value;
    this.data.reintegro = this.publicacionForm.get('reintegro')?.value;
    this._results.putPrimitiva(this.data.fecha.toString(), this.data).subscribe({
      next: (res: any) => {
        this.closeDialog();
      },
      error: (err) => {
        console.log('ERROR AL EDITAR EL RESULTADO', err);
        this._alerts.error('ERROR AL EDITAR EL RESULTADO', '');
      },
      complete: () => {},
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  eliminarPrimitiva() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este cambio es irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._alerts.loading();
        this._results
          .deleteResultado(this.data.fecha.toString(), 'Primitiva')
          .subscribe({
            next: (res: any) => {
              this._alerts.confirm();
              this.closeDialog();
            },
            error: (res) => {
              this._alerts.error('Error al eliminar el registro', '');
            },
            complete: () => {},
          });
      }
    });
  }
}
