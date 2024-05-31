import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavigationComponent } from './navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from './services/auth/login.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { PrincIpalPageComponent } from './princ-ipal-page/princ-ipal-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { AuthClassGuard } from './services/auth/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { EuroPipe } from './euro.pipe';
import { DBonolotoComponent } from './resultados/d-bonoloto/d-bonoloto.component';
import { MatSelectModule } from '@angular/material/select';
import { DPrimitivaComponent } from './resultados/d-primitiva/d-primitiva.component';
import { DEuromillonesComponent } from './resultados/d-euromillones/d-euromillones.component';
import { DLototurfComponent } from './resultados/d-lototurf/d-lototurf.component';
import { DGordoComponent } from './resultados/d-gordo/d-gordo.component';
import { DEurodreamsComponent } from './resultados/d-eurodreams/d-eurodreams.component';
import { DNacionalComponent } from './resultados/d-nacional/d-nacional.component';
import { DQuinielaComponent } from './resultados/d-quiniela/d-quiniela.component';
import { DQuinigolComponent } from './resultados/d-quinigol/d-quinigol.component';
import { DQuintupleComponent } from './resultados/d-quintuple/d-quintuple.component';
import { BBonolotoComponent } from './botes/b-bonoloto/b-bonoloto.component';
import { BEurodreamsComponent } from './botes/b-eurodreams/b-eurodreams.component';
import { BEuromillonesComponent } from './botes/b-euromillones/b-euromillones.component';
import { BGordoComponent } from './botes/b-gordo/b-gordo.component';
import { BLototurfComponent } from './botes/b-lototurf/b-lototurf.component';
import { BNacionalComponent } from './botes/b-nacional/b-nacional.component';
import { BPrimitivaComponent } from './botes/b-primitiva/b-primitiva.component';
import { BQuinielaComponent } from './botes/b-quiniela/b-quiniela.component';
import { BQuinigolComponent } from './botes/b-quinigol/b-quinigol.component';
import { BQuintupleComponent } from './botes/b-quintuple/b-quintuple.component';
import { BonolotoComponent } from './tablas/bonoloto/bonoloto.component';
import { EurodreamsComponent } from './tablas/eurodreams/eurodreams.component';
import { EuromillonesComponent } from './tablas/euromillones/euromillones.component';
import { GordoComponent } from './tablas/gordo/gordo.component';
import { LototurfComponent } from './tablas/lototurf/lototurf.component';
import { QuinigolComponent } from './tablas/quinigol/quinigol.component';
import { QuinielaComponent } from './tablas/quiniela/quiniela.component';
import { DetallesComponent } from './tablas/quinigol/detalles/detalles.component';
import { CommonModule } from '@angular/common';
import { QdetallesComponent } from './tablas/quiniela/qdetalles/qdetalles.component';
import { PrimitivaComponent } from './tablas/primitiva/primitiva.component';
import { NacionalComponent } from './tablas/nacional/nacional.component';
import { QuintupleComponent } from './tablas/quintuple/quintuple.component';
import { EditPartidoComponent } from './tablas/quiniela/edit-partido/edit-partido.component';
import { EditBonolotoComponent } from './tablas/bonoloto/edit-bonoloto/edit-bonoloto.component';
import { EditEurodreamsComponent } from './tablas/eurodreams/edit-eurodreams/edit-eurodreams.component';
import { EditEuromillonesComponent } from './tablas/euromillones/edit-euromillones/edit-euromillones.component';
import { EditGordoComponent } from './tablas/gordo/edit-gordo/edit-gordo.component';
import { EditLototurfComponent } from './tablas/lototurf/edit-lototurf/edit-lototurf.component';
import { EditNacionalComponent } from './tablas/nacional/edit-nacional/edit-nacional.component';
import { EditPrimitivaComponent } from './tablas/primitiva/edit-primitiva/edit-primitiva.component';
import { EditQuinigolComponent } from './tablas/quinigol/edit-quinigol/edit-quinigol.component';
import { EditQuintupleComponent } from './tablas/quintuple/edit-quintuple/edit-quintuple.component';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

const appRoutes: Routes = [
  { path: 'i/home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    LoginComponent,
    PrincIpalPageComponent,
    EuroPipe,
    DBonolotoComponent,
    DPrimitivaComponent,
    DEuromillonesComponent,
    DLototurfComponent,
    DGordoComponent,
    DEurodreamsComponent,
    DNacionalComponent,
    DQuinielaComponent,
    DQuinigolComponent,
    DQuintupleComponent,
    BBonolotoComponent,
    BEurodreamsComponent,
    BEuromillonesComponent,
    BGordoComponent,
    BLototurfComponent,
    BNacionalComponent,
    BPrimitivaComponent,
    BQuinielaComponent,
    BQuinigolComponent,
    BQuintupleComponent,
    BonolotoComponent,
    EurodreamsComponent,
    EuromillonesComponent,
    GordoComponent,
    LototurfComponent,
    QuinigolComponent,
    QuinielaComponent,
    DetallesComponent,
    QdetallesComponent,
    PrimitivaComponent,
    NacionalComponent,
    QuintupleComponent,
    EditPartidoComponent,
    EditBonolotoComponent,
    EditEurodreamsComponent,
    EditEuromillonesComponent,
    EditGordoComponent,
    EditLototurfComponent,
    EditNacionalComponent,
    EditPrimitivaComponent,
    EditQuinigolComponent,
    EditQuintupleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatSortModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    MatExpansionModule,
    NgxPaginationModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SweetAlert2Module.forRoot(),
    CommonModule,
  ],
  providers: [
    LoginService,
    CookieService,
    AuthClassGuard,
    AuthService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: LOCALE_ID, useValue: 'es' },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
