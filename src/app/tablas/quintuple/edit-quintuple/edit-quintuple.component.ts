import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuintupleInterface } from 'src/app/models/quintuple.interface';
import { ResultadosService } from 'src/app/services/resultados.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-quintuple',
  templateUrl: './edit-quintuple.component.html',
  styleUrls: ['./edit-quintuple.component.scss'],
})
export class EditQuintupleComponent {
  publicacionForm!: FormGroup;

  nombre!: string;
  numero!: string;
  combs: number[] = [];
  numeros: number[] = [];
  numerosC: number[] = [];
  numerosR: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private _results: ResultadosService,
    private dialogRef: MatDialogRef<EditQuintupleComponent>,
    private _alerts: SweetAlertService,
    @Inject(MAT_DIALOG_DATA) public data: QuintupleInterface
  ) {
    this.publicacionForm = this.formBuilder.group({
      fecha: [null, Validators.required],
      jornada: [null, Validators.required],
      comb1: [null, Validators.required],
      comb2: [null, Validators.required],
      comb3: [null, Validators.required],
      comb4: [null, Validators.required],
      comb5: [null, Validators.required],
      comb6: [null, Validators.required],
    });
    this.numeros = Array.from({ length: 6 }, (_, i) => i + 1);

    this.publicacionForm.get('fecha')?.setValue(data.fecha);
    this.publicacionForm.get('jornada')?.setValue(data.jornada);
    this.publicacionForm.get('comb1')?.setValue(data.combinacion[0]);
    this.publicacionForm.get('comb2')?.setValue(data.combinacion[1]);
    this.publicacionForm.get('comb3')?.setValue(data.combinacion[2]);
    this.publicacionForm.get('comb4')?.setValue(data.combinacion[3]);
    this.publicacionForm.get('comb5')?.setValue(data.combinacion[4]);
    this.publicacionForm.get('comb6')?.setValue(data.combinacion[5]);
  }

  onSubmit() {
    this.data.jornada = this.publicacionForm.get('jornada')?.value;
    this.data.combinacion = [
      this.publicacionForm.get('comb1')?.value,
      this.publicacionForm.get('comb2')?.value,
      this.publicacionForm.get('comb3')?.value,
      this.publicacionForm.get('comb4')?.value,
      this.publicacionForm.get('comb5')?.value,
      this.publicacionForm.get('comb6')?.value,
    ];
    this._results.putQuintuple(this.data.fecha.toString(), this.data).subscribe({
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

  eliminarQuintuple() {
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
          .deleteResultado(this.data.fecha.toString(), 'Quintuple')
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
