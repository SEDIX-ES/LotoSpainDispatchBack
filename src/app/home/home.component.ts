import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DQuinielaComponent } from '../resultados/d-quiniela/d-quiniela.component';
import { DNacionalComponent } from '../resultados/d-nacional/d-nacional.component';
import { DBonolotoComponent } from '../resultados/d-bonoloto/d-bonoloto.component';
import { DPrimitivaComponent } from '../resultados/d-primitiva/d-primitiva.component';
import { DEuromillonesComponent } from '../resultados/d-euromillones/d-euromillones.component';
import { DGordoComponent } from '../resultados/d-gordo/d-gordo.component';
import { DLototurfComponent } from '../resultados/d-lototurf/d-lototurf.component';
import { DEurodreamsComponent } from '../resultados/d-eurodreams/d-eurodreams.component';
import { BBonolotoComponent } from '../botes/b-bonoloto/b-bonoloto.component';
import { BEurodreamsComponent } from '../botes/b-eurodreams/b-eurodreams.component';
import { BEuromillonesComponent } from '../botes/b-euromillones/b-euromillones.component';
import { BGordoComponent } from '../botes/b-gordo/b-gordo.component';
import { BLototurfComponent } from '../botes/b-lototurf/b-lototurf.component';
import { BNacionalComponent } from '../botes/b-nacional/b-nacional.component';
import { BPrimitivaComponent } from '../botes/b-primitiva/b-primitiva.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 },
      ];
    })
  );
  constructor(
    public dialog: MatDialog,
  ){}

  ganadoresDiarios() {
    const today = new Date().getDay();
    const dialogConfigs: DialogConfig[][] = [
      [{ component: DNacionalComponent }, { component: DBonolotoComponent }, { component: DPrimitivaComponent }], // Domingo
      [{ component: DLototurfComponent }, { component: DBonolotoComponent }, { component: DGordoComponent }], // Lunes
      [{ component: DPrimitivaComponent }, { component: DBonolotoComponent }, { component: DEurodreamsComponent }], // Martes
      [{ component: DBonolotoComponent }, { component: DEuromillonesComponent }], // Miércoles
      [{ component: DBonolotoComponent }, { component: DLototurfComponent }], // Jueves
      [{ component: DNacionalComponent }, { component: DBonolotoComponent }, { component: DPrimitivaComponent }, { component: DEurodreamsComponent }, { component: DLototurfComponent }], // Viernes
      [{ component: DBonolotoComponent }] // Sábado
    ];

    const todayDialogConfigs = dialogConfigs[today];

    if (todayDialogConfigs) {
      todayDialogConfigs.forEach(dialogConfig => {
        const dialogRef = this.dialog.open(dialogConfig.component, {});
        dialogRef.afterClosed().subscribe(result => {
          console.log('Diálogo cerrado', result);
        });
      });
    }
  }

  botesDiarios() {
    const today = new Date().getDay();
    const dialogConfigs: DialogConfig[][] = [
      [{ component: BNacionalComponent }, { component: BBonolotoComponent }, { component: BPrimitivaComponent }], // Domingo
      [{ component: BLototurfComponent }, { component: BBonolotoComponent }, { component: BGordoComponent }], // Lunes
      [{ component: BPrimitivaComponent }, { component: BBonolotoComponent }, { component: BEurodreamsComponent }], // Martes
      [{ component: BBonolotoComponent }, { component: BEuromillonesComponent }], // Miércoles
      [{ component: BBonolotoComponent }, { component: BLototurfComponent }], // Jueves
      [{ component: BNacionalComponent }, { component: BBonolotoComponent }, { component: BPrimitivaComponent }, { component: BEurodreamsComponent }, { component: BLototurfComponent }], // Viernes
      [{ component: BBonolotoComponent }] // Sábado
    ];

    const todayDialogConfigs = dialogConfigs[today];

    if (todayDialogConfigs) {
      todayDialogConfigs.forEach(dialogConfig => {
        const dialogRef = this.dialog.open(dialogConfig.component, {});
        dialogRef.afterClosed().subscribe(result => {
          console.log('Diálogo cerrado', result);
        });
      });
    }
  }

}

export interface DialogConfig {
  component: any;
}
