import { Component, NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PrincIpalPageComponent } from './princ-ipal-page/princ-ipal-page.component';
import { AuthClassGuard } from './services/auth/auth.guard';
import { BonolotoComponent } from './tablas/bonoloto/bonoloto.component';
import { EurodreamsComponent } from './tablas/eurodreams/eurodreams.component';
import { EuromillonesComponent } from './tablas/euromillones/euromillones.component';
import { GordoComponent } from './tablas/gordo/gordo.component';
import { LototurfComponent } from './tablas/lototurf/lototurf.component';
import { QuinigolComponent } from './tablas/quinigol/quinigol.component';
import { QuinielaComponent } from './tablas/quiniela/quiniela.component';
import { PrimitivaComponent } from './tablas/primitiva/primitiva.component';
import { NacionalComponent } from './tablas/nacional/nacional.component';
import { QuintupleComponent } from './tablas/quintuple/quintuple.component';
const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthClassGuard] ,//funcional//
    canActivate: [() => inject(AuthClassGuard).canActivate()],
    component: NavigationComponent,

  },
  {
    path: 'login',
    component: LoginComponent,

  },

  {
    path: 'i',
    component: NavigationComponent,
    // canActivate: [() => inject(AuthClassGuard).canActivate()],

    // // canActivate: [AuthClassGuard] ,//funcional//
    // canActivateChild: [() => inject(AuthClassGuard).canActivate()],
    children: [
      {
        path: 'home',

        component: HomeComponent,

      },
      {
        path: 'bonoloto',
        component: BonolotoComponent,
      },
      {
        path: 'eurodreams',
        component: EurodreamsComponent,
      },
      {
        path: 'euromillones',
        component: EuromillonesComponent,
      },
      {
        path: 'gordo',
        component: GordoComponent,
      },
      {
        path: 'lototurf',
        component: LototurfComponent,
      },
      {
        path: 'quinigol',
        component: QuinigolComponent,
      },
      {
        path: 'quiniela',
        component: QuinielaComponent,
      },
      {
        path: 'primitiva',
        component: PrimitivaComponent,
      },
      {
        path: 'nacional',
        component: NacionalComponent,
      },
      {
        path: 'quintuple',
        component: QuintupleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
