import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: [
    './navigation.component.scss',
    './queries/navigation.component-mobile.scss',
  ],
})
export class NavigationComponent {
  @ViewChild('drawer')
  drawer!: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );


  navigateToInicio() {
    this.router.navigate(['i/home']);
  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openDrawer() {
    console.log('openDrawer() called');
    this.drawer.open();
  }

  closeDrawer() {
    this.drawer.close();
  }

  logout() {
    localStorage.removeItem('Token');
    this.router.navigate(['login']);
  }

  navigateToBonoloto() {
    this.router.navigate(['i/bonoloto']);
  }

  navigateToEuromillones() {
    this.router.navigate(['i/euromillones']);
  }

  navigateToEurodreams() {
    this.router.navigate(['i/eurodreams']);
  }

  navigateToGordo() {
    this.router.navigate(['i/gordo']);
  }

  navigateToPrimitiva() {
    this.router.navigate(['i/primitiva']);
  }

  navigateToQuiniela() {
    this.router.navigate(['i/quiniela']);
  }

  navigateToQuinigol() {
    this.router.navigate(['i/quinigol']);
  }

  navigateToQuintuple() {
    this.router.navigate(['i/quintuple']);
  }

  navigateToNacional() {
    this.router.navigate(['i/nacional']);
  }

  navigateToLototurf() {
    this.router.navigate(['i/lototurf']);
  }

}
