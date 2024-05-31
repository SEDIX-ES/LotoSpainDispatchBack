import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuinielaRowInterface } from 'src/app/models/quinielaRow.interface';
import { ResultadosService } from 'src/app/services/resultados.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-quinigol',
  templateUrl: './edit-quinigol.component.html',
  styleUrls: ['./edit-quinigol.component.scss']
})
export class EditQuinigolComponent {
  publicacionForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private _results: ResultadosService,
    private _alerts: SweetAlertService,
    private dialogRef: MatDialogRef<EditQuinigolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QuinielaRowInterface) {
    this.publicacionForm = this.formBuilder.group({

      fecha: [null, Validators.required],
      jornada: [null, Validators.required],
      equipo1: [null, Validators.required],
      equipo2: [null, Validators.required],
      marcador1: [null, Validators.required],
      marcador2: [null, Validators.required],
    });

    console.log(data);
    this.publicacionForm.get('fecha')?.setValue(data.fecha);
    this.publicacionForm.get('jornada')?.setValue(data.jornada);
    this.publicacionForm.get('equipo1')?.setValue(data.partidos.local);
    this.publicacionForm.get('equipo2')?.setValue(data.partidos.visitante);
    const strings: string[]= data.partidos.resultado.split("-");
    this.publicacionForm.get('marcador1')?.setValue(strings[0]);
    this.publicacionForm.get('marcador2')?.setValue(strings[1]);

  }

  onSubmit() {
    this.data.partidos.local=this.publicacionForm.get('equipo1')?.value;
    this.data.partidos.visitante=this.publicacionForm.get('equipo2')?.value;
    this.data.partidos.resultado=this.publicacionForm.get('marcador1')?.value + "-"+ this.publicacionForm.get('marcador2')?.value;

    console.log(this.data);
    this._results.putQuinigolPartido(this.data).subscribe({
      next: (res:any)=>{
        this.closeDialog();
      },
      error:(err)=>{
        console.error("ERROR AL ACTUALIZAR EL PARTIDO", err);
      },
      complete:()=>{}
    })
  }

  eliminarPartido() {
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
        this._results.deleteQuinigolPartido(this.data.fecha.toString(), this.data.local).subscribe({
          next: (res:any)=>{
            this._alerts.confirm();
            this.closeDialog();
          },
          error: (err)=>{
            this._alerts.error('Error al eliminar el registro', '');
          },
          complete:()=>{},
        });
      }
    });
  }



  closeDialog() {
    this.dialogRef.close();
  }
}
