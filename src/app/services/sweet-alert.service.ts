import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  ngOnInit(): void {
  }


  AlertIcon(icon: any, title: any, text: any, footer: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      footer: footer
    })
  }

  AlertTime(position: any, icon: any, title: any, confirmButton: boolean, time: number) {
    Swal.fire({
      position: position,
      icon: icon,
      title: title,
      showConfirmButton: confirmButton,
      timer: time
    })
  }

  AlertDeleteConfirm() {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¡No podrá revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Eliminado!',
          'El registro ha sido eliminado',
          'success'
        )
      }
    })
  }

  Toast(icon: any, title: any) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: icon,
      title: title
    })
  }

  CloseTimer() {
    let timerInterval: any
    Swal.fire({
      title: 'Cargando información',
      html: 'Disponible en <b></b> milisegundos',
      timer: 500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer()!.querySelector('b')
        timerInterval = setInterval(() => { b!.textContent = Swal.getTimerLeft() + '' }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    })
  }

  loading() {
    Swal.fire(
      {
        title: 'Plase wait!',
        html: 'loading',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      }
    );
  }

  closeLoading() {
    Swal.close();
  }

  confirm() {
    Swal.fire('Registro eliminado correctamente!')
  }

  update() {
    Swal.fire({
      icon: 'success',
      title: 'success',
      text: 'Information updated successfully'
    })
  }

  error(title: string, subtitle: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: subtitle,
    })

  }
}
