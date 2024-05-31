import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NacionalInterface } from 'src/app/models/nacional.inerface';
import { ResultadosService } from 'src/app/services/resultados.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-nacional',
  templateUrl: './edit-nacional.component.html',
  styleUrls: ['./edit-nacional.component.scss'],
})
export class EditNacionalComponent {
  publicacionForm!: FormGroup;

  combs: number[] = [];
  numeros: number[] = [];
  numerosE: number[] = [];
  seleccionados: number[] = [];
  tipo: string[] = ['Jueves', 'Sábado', 'Extraordinario'];
  extra: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _results: ResultadosService,
    private dialogRef: MatDialogRef<EditNacionalComponent>,
    private _alerts: SweetAlertService,
    @Inject(MAT_DIALOG_DATA) public data: NacionalInterface
  ) {
    this.publicacionForm = this.formBuilder.group({
      fecha: [null, Validators.required],
      tipo: [null, Validators.required],
      ganador1: [null, Validators.required],
      ganador2: [null, Validators.required],
      reint1: [null, Validators.required],
      reint2: [null, Validators.required],
      reint3: [null, Validators.required],
      nombreExtra: [null],
    });
    this.numerosE = Array.from({ length: 10 }, (_, i) => i);

    this.publicacionForm.get('fecha')?.setValue(data.fecha);
    this.publicacionForm.get('tipo')?.setValue(data.tipo);
    this.publicacionForm.get('ganador1')?.setValue(data.combinacion1);
    this.publicacionForm.get('ganador2')?.setValue(data.combinacion2);
    this.publicacionForm.get('reint1')?.setValue(data.reintegros[0]);
    this.publicacionForm.get('reint2')?.setValue(data.reintegros[1]);
    this.publicacionForm.get('reint3')?.setValue(data.reintegros[2]);
    this.publicacionForm.get('nombreExtra')?.setValue(data.nombreExtra);

    this.comprobarExtra();
  }

  onSubmit() {
    this.data.tipo = this.publicacionForm.get('tipo')?.value,
    this.data.combinacion1 = this.publicacionForm.get('ganador1')?.value,
    this.data.combinacion2 = this.publicacionForm.get('ganador2')?.value,
    this.data.reintegros = [
        this.publicacionForm.get('reint1')?.value,
        this.publicacionForm.get('reint2')?.value,
        this.publicacionForm.get('reint3')?.value,
      ],
    this.data.nombreExtra = this.publicacionForm.get('nombreExtra')?.value,
    this._results.putNacional(this.data.fecha.toString(), this.data).subscribe({
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

  eliminarLototurf() {
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
          .deleteResultado(this.data.fecha.toString(), 'Nacional')
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

  comprobarExtra() {
    console.log(this.publicacionForm.get('tipo')?.value);
    console.log(this.extra);
    if (
      this.publicacionForm.get('tipo')?.value?.toLowerCase() ===
      'extraordinario'
    ) {
      this.extra = true;
      console.log(this.extra);
    } else {
      this.extra = false;
    }
  }
}
